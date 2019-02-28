import axios from 'axios';
import { apiKey } from './credentials';

export default class ApiService {
  client: any;

  constructor() {
    this.client = axios.create();
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
