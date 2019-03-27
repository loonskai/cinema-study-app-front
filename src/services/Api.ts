import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiKey } from '../credentials';

import {
  ResType,
  UserAPIType,
  MovieAPIType,
  CinemaAPIType
} from '../interfaces/Api';
import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';
import Movie from '../classes/Movie';

import parseResponse from '../helpers/parseResponse';

// ADD verify token endpoint
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

  async createCinema(body: CinemaAPIType): Promise<any> {
    try {
      const res = await this.client.post('http://localhost:5000/cinema', body);
      return parseResponse.success(res.data);
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  }

  async getMovies(): Promise<ResType<MovieAPIType[] | Error>> {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      if (!data || !data.results) {
        throw Error('Cannot load movies list from API');
      }
      return parseResponse.success(data.results);
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  }

  async getMovieById(id: string): Promise<ResType<MovieAPIType | Error>> {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      if (!data) {
        throw Error('Cannot load movie from API');
      }
      return parseResponse.success(data);
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  }

  /*   async addMovies(data: Movie[]): Promise<ResType<MovieAPIType[] | Error>> {
    try {
      return new Promise((res, rej) => {
        console.log('create movie -->', data);
        return res([]);
      });
      
        const { data } = await this.client.post(`https://localhost:5000/movies`, data);
        if (!data) {
          throw Error('Unable to add movies');
        }
        return parseResponse.success(data);
      
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  } */

  /*   async loadSessionById(id: number) {
    try {
      return new Promise((res, rej) => {
        return res(sessions.find(session => session.id === id));
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadSessionsList(options: any) {
    try {
      return new Promise((res, rej) => {
        setTimeout(() => res(sessions), 1000);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadAllSeats() {
    try {
      return new Promise((res, rej) => {
        return res(seats);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadSessionBonuses(sessionId: number) {
    try {
      return new Promise((res, rej) => {
        return res(bonus);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadAllCinemas() {
    try {
      return new Promise((res, rej) => {
        return res(cinemas);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadCinemasByCity(city: string) {
    try {
      const filteredCinemas = cinemas.filter(
        (cinema: any) => cinema.city === city
      );
      return new Promise((res, rej) => {
        return res(filteredCinemas);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadHallsByCinema(cinemaId: any) {
    try {
      const filteredHalls = halls.filter(
        (hall: any) => hall.cinemaId === cinemaId
      );
      return new Promise((res, rej) => {
        return res(filteredHalls);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async reserve(options: any) {
    try {
      return new Promise((res, rej) => {
        console.log('reserve seats -->', options);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

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

  /*   async loadCities() {
    try {
      const cities = Object.keys(
        sessions.reduce((obj: any, session: any) => {
          obj[session.city] = true;
          return obj;
        }, {})
      );
      return new Promise((res, rej) => {
        return res(cities);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /** ADMIN OPERATIONS */
  /*   async createCinema(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create cinema -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadRowCategories(hallId?: number) {
    try {
      return new Promise((res, rej) => {
        if (!hallId) {
          return res(rowCategories);
        }

        const { rows: hallRows }: any = seats.find(
          hall => hall.hallId === hallId
        );
        const hallCategoriesIDs: any = Object.keys(
          hallRows.reduce((acc: any, row: any) => {
            acc[row.categoryId] = true;
            return acc;
          }, {})
        );
        const filteredCategories = rowCategories.filter(category =>
          hallCategoriesIDs.includes(category.id.toString())
        );
        return res(filteredCategories);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async createHall(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create hall -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async createService(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create service -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async createSession(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create session -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadExternalAPIMovies() {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/4/list/1?page=1&api_key=${apiKey}`
      );
      return data.results;
    } catch (error) {
      console.error(error);
    }
  } */
}

const api = new ApiService();
export default api;