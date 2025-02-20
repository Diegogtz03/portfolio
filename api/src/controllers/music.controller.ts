import { db, Song, song, token } from "../db/schema";
import { SpotifyApi, IValidateResponses} from "@spotify/web-api-ts-sdk";
import { stringify } from "querystring"
import { eq, is } from "drizzle-orm";

export class MusicController {
  static async getCurrentPlayingSong(req, res) {
    let api = await getSpotifyClient();

    let item = await api.player.getCurrentlyPlayingTrack();

    if (item == undefined) {
      res.json({message: "No song is currently playing"});
      return;
    }

    res.json({
      is_playing: item.is_playing,
      name: item.item.name,
      artists: item.item["artists"].map(artist => artist["name"]).join(", "),
      song_url: item.item.external_urls.spotify,
      preview_url: item.item["preview_url"],
      album_image: item.item["album"].images[0].url,
    });
  }

  static async getSongs(req, res) {
    // 0: basic (entry id, song url, preview url, name, album image, highlighted)
    // 1: detailed (entry id, song url, preview url, name, artists, album image, note, highlighted)
    let type = req.body.type;

    let songId = req.body.songId;

    let songs: Song[] = [];

    if (songId != undefined) {
      let response = await db.select().from(song).where(eq(song.id, songId));
      songs = response;
    } else {
      songs = await db.select().from(song);
    }

    // From song uuid, and spotify api, get the song name and artists
    let api = await getSpotifyClient();

    let finalResponse: any[] = [];

    for (let song of songs) {
      let item = await api.tracks.get(song.song_uuid ?? "", "US");

      if (type == 0) {
        finalResponse.push({
          id: song.id,
          preview_url: item.preview_url,
          album_image: item.album.images[0].url,
        });
      } else {
        finalResponse.push({
          id: song.id,
          song_url: item.external_urls.spotify,
          preview_url: item.preview_url,
          name: item.name,
          artists: item.artists.map((artist: any) => artist.name).join(", "),
          album_image: item.album.images[0].url,
          note: song.note,
          highlighted: song.highlighted
        });
      }
    }
    
    if (finalResponse.length == 1 && songId) {
      res.json(finalResponse[0]);
      return;
    }

    res.json({songs: finalResponse});
  }
  
  static async addSong(req, res) {
    let response = await db.insert(song).values({
      song_uuid: req.body.song_uuid,
      note: req.body.note,
      highlighted: req.body.highlighted
    });

    res.json(response);
  }

  static async deleteSong(req, res) {
    console.log(req.body);
    console.log("DELETING")
    let response = await db.delete(song).where(eq(song.id, req.body.id));
    res.json(response);
  }

  static async updateSong(req, res) {
    let response = await db.update(song).set({
      note: req.body.note,
      highlighted: req.body.highlighted
    }).where(eq(song.id, req.body.id));

    res.json(response);
  }
}

async function getSpotifyClient(): Promise<SpotifyApi> {
  // get current token
  let access_token = await db.selectDistinct({access_token: token.token, generated_at: token.generated_at}).from(token).where(eq(token.id, "spotify"));
  let final_token = access_token[0].access_token ?? "";

  // Check if token is expired, if so, refresh it
  if (new Date().getTime() - access_token[0].generated_at!.getTime() > 3600 * 1000) {
    final_token = await refreshToken();
  }

  let api = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID ?? "", {
    "access_token": final_token,
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": process.env.SPOTIFY_REFRESH_TOKEN ?? ""
  }, { responseValidator: new CustomValidator });

  return api;
}

export default class CustomValidator implements IValidateResponses {
  public async validateResponse(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        // Refresh token if by any chance it was expired
        refreshToken();
        break;
    }
  }
}

async function insertToken() {
  await db.insert(token).values({
    id: "spotify",
    token: "BQBv3CGFxjG0kB5HEZBgK5LkHuMR1HQ5LP4NUakwMaR4Hu3JMnldprM0EWoi7kwfyYKWXfToqqtjTXuDo97LgYHLM8plftLZ25LXlvI9dVupdruo6Y2hA1zuq3qUWerxnGjAuAiwSenxqOHRymvso0QZGERegXrHU8U58o-1yp3s__sPxZijSsIy9galUVLIpXEpfwkRZQ",
    type: "Bearer",
    expires: 3000
  })
}

// function to refresh token
async function refreshToken(): Promise<string> {
  let response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${process.env.SPOTIFY_BEARER ?? ""}`
    },
    body: stringify({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? ""
    })
  })

  let data = await response.json();

  // update the token in the database
  await db.update(token).set({
    token: data.access_token,
    generated_at: new Date()
  }).where(eq(token.id, "spotify"))

  return data.access_token ?? "";
}