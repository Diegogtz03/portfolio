export interface Media {
  id: string;
  title: string | null;
  note: string | null;
  stars: number | null;
  poster_path: string;
  backdrop_path: string | null;
  homepage: string | null;
  overview: string | null;
  genres: string[] | null;
  is_tv_show: boolean;
  highlighted: boolean;
}

export interface MediaList {
  media: Media[];
}
