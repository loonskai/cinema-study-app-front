import { RowItem } from '../components/admin/elements/NewRowController';

export interface ResType<Data> {
  error?: boolean;
  message?: string;
  success?: boolean;
  data?: Data;
}

export interface UserAPIType {
  token: string;
  userID: number;
  user: string;
  userName: string;
  role: 'admin' | 'client';
}

export interface CinemaAPIType {
  id: number;
  title: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HallAPIType {
  id?: number;
  'cinema-id': number | string;
  title: string;
  cinema: CinemaAPIType;
  rows: RowItem[];
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

export interface SeatItem {
  row: number;
  seat: number;
  price?: number;
  userID?: number | null;
}

export interface SessionAPIType {
  id?: number;
  date: Date;
  'hall-id': number;
  'movie-id': number;
  movie: MovieAPIType;
  hall: HallAPIType;
  ordered: SeatItem[] | null;
  reserved: SeatItem[] | null;
  prices: Array<{ id: number; price: number }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RowAPIType {
  id: number | string;
  quantity: number | string;
  lastInSection: boolean | string;
  'category-id': number;
  'hall-id'?: number;
  price?: number;
  reserved?: number[];
  ordered?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RowCategoryAPIType {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderReduxType {
  sessionID: number;
  hallID: number;
  seatsPicked: SeatItem[];
  bonuses: any;
}

export interface OrderAPIType {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  session: {
    id: number;
    date: Date;
    movie: MovieAPIType;
    hall: HallAPIType;
  };
  seats: SeatItem[];
  bonuses: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
