export interface LiveMusic {
  is_playing: boolean,
  name: string,
  artists: string,
  song_url: string,
  preview_url: string,
  album_image: string
}

export interface ErrorMessage {
  message: string
}

export interface Song {
  id: string,
  song_url: string | null,
  preview_url: string,
  name: string | null,
  artists: string | null,
  album_image: string,
  note: string | null,
  highlighted: boolean | null
}

export interface SongList {
  songs: Song[]
}