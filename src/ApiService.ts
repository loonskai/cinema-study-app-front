import axios from 'axios';
import { apiKey } from './credentials';
import randomstring from 'randomstring';

import {
  sessions,
  seats,
  users,
  bonus,
  userData,
  cinemas,
  halls,
  rowCategories
} from './mocks';

class ApiService {
  client: any;

  constructor() {
    this.client = axios.create();
  }

  async signIn(values: any) {
    try {
      // Random string as access token. Should be changed to real token from server
      const token = randomstring.generate();
      const { role }: any = users.find(
        (user: any) =>
          user.email === values.email || user.username === values.username
      );
      return new Promise((res, rej) => {
        res({ token, role });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async signOut() {
    try {
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async validateToken(token: string) {
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
  }

  async loadUserInfo() {
    try {
      return new Promise((res, rej) => {
        return res(userData);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadMoviesList() {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/4/list/1?page=1&api_key=${apiKey}`
      );
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async loadMovieById(id: string) {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async loadSessionById(id: number) {
    try {
      return new Promise((res, rej) => {
        return res(sessions.find(session => session.id === id));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadSessionsList(options: any) {
    try {
      return new Promise((res, rej) => {
        setTimeout(() => res(sessions), 1000);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadAllSeats() {
    try {
      return new Promise((res, rej) => {
        return res(seats);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadSessionBonuses(sessionId: number) {
    try {
      return new Promise((res, rej) => {
        return res(bonus);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadAllCinemas() {
    try {
      return new Promise((res, rej) => {
        return res(cinemas);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadCinemasByCity(city: string) {
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
  }

  async loadHallsByCinema(cinemaId: any) {
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
  }

  async reserve(options: any) {
    try {
      return new Promise((res, rej) => {
        console.log('reserve seats -->', options);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async submitOrder(order: any) {
    try {
      return new Promise((res, rej) => {
        console.log('submit order -->', order);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadCities() {
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
  }

  /** ADMIN OPERATIONS */
  async createCinema(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create cinema -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadRowCategories(hallId?: number) {
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
  }

  async createHall(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create hall -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createService(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create service -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createSession(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create session -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadExternalAPIMovies() {
    try {
      const { data } = await this.client.get(
        `https://api.themoviedb.org/4/list/1?page=1&api_key=${apiKey}`
      );
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async addMovies(data: any) {
    try {
      return new Promise((res, rej) => {
        console.log('create movie -->', data);
        return res(true);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const api = new ApiService();
export default api;
