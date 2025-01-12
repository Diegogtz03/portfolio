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