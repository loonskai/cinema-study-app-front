import axios from 'axios';
import { apiKey } from './credentials';
import randomstring from 'randomstring';

import { sessions, seats, bonus, userData } from './mocks';

class ApiService {
  client: any;

  constructor() {
    this.client = axios.create();
  }

  async signIn(values: any) {
    try {
      // Random string as access token. Should be changed to real token from server
      const token = randomstring.generate();
      return new Promise((res, rej) => {
        res(token);
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
        return res(true);
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
        return res(sessions);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async loadHallSeats(hallId: any, options: any) {
    try {
      return new Promise((res, rej) => {
        const hallSeats = seats.find(hallSeats => hallSeats.hallId === hallId);
        return res(hallSeats);
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
}

const api = new ApiService();
export default api;
