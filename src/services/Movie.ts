import apiService from './Api';
import Movie from '../classes/Movie';

import { MovieAPIType } from '../interfaces/Api';

export default {
  async getAll(): Promise<Movie[] | null> {
    try {
      const res = await apiService.getMovies();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return res.data.map((movie: MovieAPIType) => new Movie(movie));
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getOneById(id: string): Promise<Movie | null> {
    try {
      const res = await apiService.getMovieById(id);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return new Movie(res.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async create(data: Movie[]): Promise<any> {
    try {
      // console.log('create movie -->', data);
      const res = await apiService.addMovies(data);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }
};
