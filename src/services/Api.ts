import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import Movie from '../classes/Movie';
import { HallCreateType } from '../services/Hall';
import { BonusCreateType } from '../services/Bonus';
import { SessionCreateType } from '../services/Session';
import {
  ResType,
  UserAPIType,
  MovieAPIType,
  CinemaAPIType,
  BonusAPIType,
  SessionAPIType,
  RowCategoryAPIType,
  SeatItem
} from '../interfaces/Api';
import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';

class ApiService {
  client: AxiosInstance;
  accessToken: string | null;

  constructor() {
    this.client = axios.create();
    this.accessToken = sessionStorage.getItem('accessToken');

    this.client.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (!this.accessToken) {
          return config;
        }
        const newConfig = {
          headers: {},
          ...config
        };

        newConfig.headers.Authorization = `Bearer ${this.accessToken}`;
        return newConfig;
      }
    ),
      (e: Error) => Promise.reject(e);
  }

  async signUp(body: SignUpBodyType): Promise<ResType<string>> {
    const res = await this.client.post(
      'http://localhost:5000/auth/signup',
      body
    );
    return res;
  }

  async signIn(body: SignInBodyType): Promise<ResType<UserAPIType>> {
    const { data } = await this.client.post(
      'http://localhost:5000/auth/signin',
      body
    );
    if (!data || !data.success) {
      throw Error('Unable to parse token data');
    }
    this.accessToken = data.data.token;
    return data;
  }

  async validateToken(token: string): Promise<ResType<UserAPIType>> {
    const res = await this.client.post('http://localhost:5000/auth/validate', {
      token
    });
    return res.data;
  }

  /*   async loadUserInfo() {
    try {
      return new Promise((res, rej) => {
        return res(userData);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /* CINEMAS */
  async createCinema(body: CinemaAPIType): Promise<any> {
    const res = await this.client.post('http://localhost:5000/cinema', body);
    return res;
  }

  async getCinemas(params?: any): Promise<any> {
    const res = await this.client.get('http://localhost:5000/cinema', {
      params
    });
    return res.data;
  }

  async updateCinema(id: number, body: CinemaAPIType): Promise<any> {
    const res = await this.client.patch(
      `http://localhost:5000/cinema/${id}`,
      body
    );
    return res.data;
  }

  async deleteCinema(id: number): Promise<boolean> {
    await this.client.delete(`http://localhost:5000/cinema/${id}`);
    return true;
  }

  /* HALLS */
  async createHall(body: HallCreateType): Promise<any> {
    const res = await this.client.post('http://localhost:5000/hall', body);
    return res;
  }

  async getHalls(params?: any): Promise<any> {
    const res = await this.client.get('http://localhost:5000/hall', { params });
    return res.data;
  }

  /* MOVIES */
  async getMovies(): Promise<ResType<MovieAPIType[]>> {
    const res = await this.client.get('http://localhost:5000/movies');
    return res.data;
  }

  async getMovieById(id: number): Promise<ResType<MovieAPIType>> {
    const res = await this.client.get(`http://localhost:5000/movies/${id}`);
    return res.data;
  }

  async createMovies(body: Movie[]): Promise<ResType<MovieAPIType[]>> {
    const res = await this.client.post('http://localhost:5000/movies', body);
    return res.data;
  }

  async updateMovie(id: number, body: MovieAPIType): Promise<any> {
    const res = await this.client.patch(
      `http://localhost:5000/movies/${id}`,
      body
    );
    return res.data;
  }

  async deleteMovie(id: number): Promise<boolean> {
    await this.client.delete(`http://localhost:5000/movies/${id}`);
    return true;
  }

  /* BONUSES */
  async getBonuses(params?: any): Promise<ResType<BonusAPIType[]>> {
    const res = await this.client.get('http://localhost:5000/bonuses', {
      params
    });
    return res.data;
  }

  async createBonus(body: BonusCreateType): Promise<any> {
    const res = await this.client.post('http://localhost:5000/bonuses', body);
    return res;
  }

  async updateBonus(id: number, body: BonusCreateType): Promise<any> {
    const res = await this.client.patch(
      `http://localhost:5000/bonuses/${id}`,
      body
    );
    return res.data;
  }

  async deleteBonus(id: number): Promise<boolean> {
    await this.client.delete(`http://localhost:5000/bonuses/${id}`);
    return true;
  }

  /* SESSIONS */
  async createSession(body: SessionCreateType): Promise<any> {
    const res = await this.client.post('http://localhost:5000/sessions', body);
    return res.data;
  }

  async getSessions(params?: any): Promise<ResType<SessionAPIType[]>> {
    const res = await this.client.get('http://localhost:5000/sessions', {
      params
    });
    return res.data;
  }

  async getSessionById(id: number): Promise<ResType<SessionAPIType>> {
    const res = await this.client.get(`http://localhost:5000/sessions/${id}`);
    return res.data;
  }

  async deleteSession(id: number): Promise<boolean> {
    await this.client.delete(`http://localhost:5000/sessions/${id}`);
    return true;
  }

  /* ORDERS */
  async toggleReservation(sessionID: number, item: SeatItem): Promise<boolean> {
    await this.client.post(
      `http://localhost:5000/order/reserve/${sessionID}`,
      item
    );
    return true;
  }

  /*   async submitOrder(order: any) {
    try {
      return new Promise((res, rej) => {
        console.log('submit order -->', order);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /* ADDITIONAL DATA */
  async getRowCategories(params?: any): Promise<ResType<RowCategoryAPIType[]>> {
    const res = await this.client.get(
      'http://localhost:5000/data/row-categories',
      {
        params
      }
    );
    return res.data;
  }

  async getCities() {
    const res = await this.client.get('http://localhost:5000/data/cities');
    return res.data;
  }
}

const api = new ApiService();
export default api;
