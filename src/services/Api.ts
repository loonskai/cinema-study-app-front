import axios, { AxiosInstance } from 'axios';
import { apiKey } from '../credentials';
import randomstring from 'randomstring';

import { ResType, UserAPIType, MovieAPIType } from '../interfaces/Api';
import { SignInBodyType } from '../interfaces/Auth';
import Movie from '../classes/Movie';

import parseResponse from '../helpers/parseResponse';

/* getAll(): Movie[] {
  return apiService.getAllMovies()
    .then(movies => movies.map(movie => new Movie(movie)))
} */

import {
  sessions,
  seats,
  users,
  bonus,
  userData,
  cinemas,
  halls,
  rowCategories
} from '../mocks';

class ApiService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  async signIn(body: SignInBodyType): Promise<ResType<UserAPIType>> {
    try {
      const { data } = await this.client.post('http://localhost:5000', body);
      if (!data) {
        throw Error('Cannot sign in');
      }
      return parseResponse.success(data.results);
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  }

  /*   async signOut() {
    try {
      return true;
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async validateToken(token: string) {
    try {
      // Here we make request to validate token that has been received from sessionStorage while app initialization
      return new Promise((res, rej) => {
        return res({
          tokenIsValid: true,
          role: 'admin'
        });
      });
    } catch (error) {
      console.error(error);
    }
  } */

  /*   async loadUserInfo() {
    try {
      return new Promise((res, rej) => {
        return res(userData);
      });
    } catch (error) {
      console.error(error);
    }
  } */

  async getMovies(): Promise<ResType<MovieAPIType[]>> {
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

  async getMovieById(id: string): Promise<ResType<MovieAPIType>> {
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

  async addMovies(data: Movie[]): Promise<ResType<MovieAPIType[]>> {
    try {
      return new Promise((res, rej) => {
        console.log('create movie -->', data);
        return res([]);
      });
      /*
        const { data } = await this.client.post(`https://localhost:5000/movies`, data);
        if (!data) {
          throw Error('Unable to add movies');
        }
        return parseResponse.success(data);
      */
    } catch (error) {
      console.error(error);
      return parseResponse.error(error);
    }
  }

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
