import { db, media, Media } from "../db/schema";
import { eq, is } from "drizzle-orm";

export class MediaController {
  static async getMedia(req, res) {
    const mediaId = req.body.mediaId;
    const type = req.body.type;

    let mediaResponse: Media[] = [];

    if (mediaId != undefined) {
      mediaResponse = await db.select().from(media).where(eq(media.id, mediaId));
    } else {
      mediaResponse = await db.select().from(media);
    }

    let finalResponse: any[] = [];

    // For each, get the media info from TMDB
    for (let media of mediaResponse) {
      let finalMedia:any = {}

      finalMedia["id"] = media.id;
      finalMedia["is_tv_show"] = media.is_tv_show;
      finalMedia["highlighted"] = media.highlighted;

      let url_type = "movie";

      if (media.is_tv_show) {
        url_type = "tv";
      }

      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${process.env.TMDB_API_KEY}`);

      const response = await fetch(`https://api.themoviedb.org/3/${url_type}/${media.media_uuid}?language=en-US`, {
        method: "GET",
        headers: myHeaders,
      });

      const data = await response.json();

      finalMedia.poster_path = `https://image.tmdb.org/t/p/original${data.poster_path}`;

      if (type === 1) {
        // tmdb data
        finalMedia["title"] = data.original_title ?? data.name;
        finalMedia["overview"] = data.overview;
        finalMedia["backdrop_path"] = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
        finalMedia["homepage"] = data.homepage;
        finalMedia["overview"] = data.overview;
        finalMedia["genres"] = data.genres.map((genre: any) => genre.name);

        // db data
        finalMedia["stars"] = media.stars;
        finalMedia["note"] = media.note;
      }

      console.log(finalMedia);
      finalResponse.push(finalMedia);
    }

    console.log(finalResponse);

    if (finalResponse.length === 1 && mediaId) {
      res.json(finalResponse[0]);
      return;
    }

    res.json({media: finalResponse});
  } 

  static async addMedia(req, res) {
    const response = await db.insert(media).values(req.body);
    res.json(response);
  }

  static async deleteMedia(req, res) {
    const response = await db.delete(media).where(eq(media.id, req.body.id));
    res.json(response);
  }

  static async updateMedia(req, res) {
    const response = await db.update(media).set(req.body).where(eq(media.id, req.body.id));
    res.json(response);
  }
}

export default MediaController;