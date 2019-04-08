import { RowItem } from '../components/admin/elements/NewRowController';

export interface ResType<Data> {
  error?: boolean;
  message?: string;
  success?: boolean;
  data?: Data;
}

export interface UserAPIType {
  token: string;
  user: string;
  role: 'admin' | 'client';
}

export interface CinemaAPIType {
  id?: number;
  title: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HallAPIType {
  id?: number;
  'cinema-id': number | string;
  title: string;
  rows?: RowItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MovieAPIType {
  id: number;
  title: string;
  overview: string;
  poster: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// From TheMovieDatabase service
export interface ExternalAPIMovie {
  id: number;
  title: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BonusAPIType {
  id?: number;
  'cinema-id': number | string;
  title: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
