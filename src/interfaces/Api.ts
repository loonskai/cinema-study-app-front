export interface ResType<Data> {
  error?: boolean;
  message?: string;
  success?: boolean;
  data?: Data;
}

export interface MovieAPIType {
  original_title: string;
  overview: string;
  poster_path: string;
}

export interface UserAPIType {
  token: string;
  user: string;
  role: 'admin' | 'client';
}

export interface CinemaAPIType {
  title: string;
  city: string;
}