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
  }
};
