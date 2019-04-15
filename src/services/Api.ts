import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import Movie from '../classes/Movie';
import { HallCreateType } from '../services/Hall';
import { BonusCreateType } from '../services/Bonus';
import { SessionCreateType } from '../services/Session';
import {
  ResType,
  UserAPIType,
  MovieAPIType,
  BonusAPIType,
  SessionAPIType,
  RowCategoryAPIType,
  SeatItem
} from '../interfaces/Api';
import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';

class ApiService {
  rootAPIPath: string;
  client: AxiosInstance;
  accessToken: string | null;

  constructor() {
    this.rootAPIPath = process.env.API_ROOT_PATH || 'http://localhost:5000';
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
    const res = await this.client.post(`${this.rootAPIPath}/auth/signup`, body);
    return res;
  }

  async signIn(body: SignInBodyType): Promise<ResType<UserAPIType>> {
    const { data } = await this.client.post(
      `${this.rootAPIPath}/auth/signin`,
      body
    );
    if (!data || !data.success) {
      throw Error('Unable to parse token data');
    }
    this.accessToken = data.data.token;
    return data;
  }

  async signOut(): Promise<boolean> {
    await this.client.post(`${this.rootAPIPath}/auth/signout`);
    return true;
  }

  async validateToken(token: string): Promise<ResType<UserAPIType>> {
    const res = await this.client.post(`${this.rootAPIPath}/auth/validate`, {
      token
    });
    return res.data;
  }

  /* CINEMAS */
  async createCinema(body: any): Promise<any> {
    const res = await this.client.post(`${this.rootAPIPath}/cinema`, body);
    return res;
  }

  async getCinemas(params?: any): Promise<any> {
    const res = await this.client.get(`${this.rootAPIPath}/cinema`, {
      params
    });
    return res.data;
  }

  async updateCinema(
    id: number,
    body: { title: string; city: string }
  ): Promise<any> {
    const res = await this.client.patch(
      `${this.rootAPIPath}/cinema/${id}`,
      body
    );
    return res.data;
  }

  async deleteCinema(id: number): Promise<boolean> {
    await this.client.delete(`${this.rootAPIPath}/cinema/${id}`);
    return true;
  }

  /* HALLS */
  async createHall(body: HallCreateType): Promise<any> {
    const res = await this.client.post(`${this.rootAPIPath}/hall`, body);
    return res;
  }

  async getHalls(params?: any): Promise<any> {
    const res = await this.client.get(`${this.rootAPIPath}/hall`, { params });
    return res.data;
  }

  /* MOVIES */
  async getMovies(): Promise<ResType<MovieAPIType[]>> {
    const res = await this.client.get(`${this.rootAPIPath}/movies`);
    return res.data;
  }

  async getMovieById(id: number): Promise<ResType<MovieAPIType>> {
    const res = await this.client.get(`${this.rootAPIPath}/movies/${id}`);
    return res.data;
  }

  async createMovies(body: Movie[]): Promise<ResType<MovieAPIType[]>> {
    const res = await this.client.post(`${this.rootAPIPath}/movies`, body);
    return res.data;
  }

  async updateMovie(id: number, body: MovieAPIType): Promise<any> {
    const res = await this.client.patch(
      `${this.rootAPIPath}/movies/${id}`,
      body
    );
    return res.data;
  }

  async deleteMovie(id: number): Promise<boolean> {
    await this.client.delete(`${this.rootAPIPath}/movies/${id}`);
    return true;
  }

  /* BONUSES */
  async getBonuses(params?: any): Promise<ResType<BonusAPIType[]>> {
    const res = await this.client.get(`${this.rootAPIPath}/bonuses`, {
      params
    });
    return res.data;
  }

  async createBonus(body: BonusCreateType): Promise<any> {
    const res = await this.client.post(`${this.rootAPIPath}/bonuses`, body);
    return res;
  }

  async updateBonus(id: number, body: BonusCreateType): Promise<any> {
    const res = await this.client.patch(
      `${this.rootAPIPath}/bonuses/${id}`,
      body
    );
    return res.data;
  }

  async deleteBonus(id: number): Promise<boolean> {
    await this.client.delete(`${this.rootAPIPath}/bonuses/${id}`);
    return true;
  }

  /* SESSIONS */
  async createSession(body: SessionCreateType): Promise<any> {
    const res = await this.client.post(`${this.rootAPIPath}/sessions`, body);
    return res.data;
  }

  async getSessions(params?: any): Promise<ResType<SessionAPIType[]>> {
    const res = await this.client.get(`${this.rootAPIPath}/sessions`, {
      params
    });
    return res.data;
  }

  async getSessionById(id: number): Promise<ResType<SessionAPIType>> {
    const res = await this.client.get(`${this.rootAPIPath}/sessions/${id}`);
    return res.data;
  }

  async deleteSession(id: number): Promise<boolean> {
    await this.client.delete(`${this.rootAPIPath}/sessions/${id}`);
    return true;
  }

  /* ORDERS */
  async createOrder(body: any): Promise<boolean> {
    await this.client.post(`${this.rootAPIPath}/order`, body);
    return true;
  }

  async getPersonalOrders(): Promise<any> {
    const res = await this.client.get(`${this.rootAPIPath}/order/my`);
    return res.data;
  }

  async toggleReservation(sessionID: number, item: SeatItem): Promise<boolean> {
    await this.client.post(
      `${this.rootAPIPath}/order/reserve/${sessionID}`,
      item
    );
    return true;
  }

  async clearReservation(sessionID: number, items: any): Promise<boolean> {
    await this.client.post(
      `${this.rootAPIPath}/order/reserve/clear/${sessionID}`,
      items
    );
    return true;
  }

  /* ADDITIONAL DATA */
  async getRowCategories(params?: any): Promise<ResType<RowCategoryAPIType[]>> {
    const res = await this.client.get(
      `${this.rootAPIPath}/data/row-categories`,
      {
        params
      }
    );
    return res.data;
  }

  async getCities() {
    const res = await this.client.get(`${this.rootAPIPath}/data/cities`);
    return res.data;
  }
}

const api = new ApiService();
export default api;
