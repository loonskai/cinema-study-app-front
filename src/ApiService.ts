import axios from 'axios';
import { apiKey } from './credentials';
import randomstring from 'randomstring';

export default class ApiService {
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
}
