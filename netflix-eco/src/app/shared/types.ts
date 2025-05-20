export interface SearchResult {
  id: number;
  name: string;
  first_air_date: string;
  title:string;
  poster_path?: string | null;
  popularity: number;
  type: string;
  release_date:string;
  overview: string;
  original_language: string;
}

export interface SerieDetails {
  id: number;
  next_episode_to_air?: {
    id:number ;
    air_date: string;
    episode_number: number;
    season_number: number;
  } | null;
}

export interface SerieBase {
  id: number|null;
  serieId: number;
  name: string;
  first_air_date: string;
  poster_path?: string | null;
  next_episode_to_air?: NextEpisode | null;
  overview: string;
  original_language: string;
  apiRef?: string;
  type: string;
}

export interface NextEpisode {
  next_episode_id:number | null;
  air_date: string;
  episode_number: number;
  season_number: number;
}
