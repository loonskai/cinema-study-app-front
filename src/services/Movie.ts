import axios from 'axios';
import { apiKey } from '../credentials';

import apiService from './Api';
import Movie from '../classes/Movie';

import { MovieAPIType, ExternalAPIMovie, ResType } from '../interfaces/Api';

export default {
  async create(data: Movie[]): Promise<any> {
    /*     try {
      // console.log('create movie -->', data);
      const res = await apiService.addMovies(data);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return true;
    } catch (error) {
      console.error(error);
    } */
  },

  async createMany(data: {
    [key: number]: Movie;
  }): Promise<MovieAPIType[] | null> {
    try {
      const body = Object.values(data);
      const res = await apiService.createMovies(body);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getExternalAPIMovieAll(): Promise<ExternalAPIMovie[] | null> {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/4/list/1?page=1&api_key=${apiKey}`
      );
      return data.results;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getAll(stateSetter?: (data: Movie[]) => void): Promise<Movie[] | null> {
    try {
      const res = await apiService.getMovies();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      const result = res.data.map(movie => new Movie(movie));
      if (stateSetter) {
        stateSetter(result);
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getOneById(id: string): Promise<Movie | null> {
    /*     try {
      const res = await apiService.getMovieById(id);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return new Movie(res.data);
    } catch (error) {
      console.error(error);
      return null;
    } */
  },

  async update(id: number, values: MovieAPIType): Promise<ResType<Movie>> {
    try {
      const { title, overview, poster } = values;
      if (!id) {
        throw Error('Cinema ID not defined');
      }
      if (!title || !overview || !poster) {
        throw Error('Invalid values');
      }
      const { data } = await apiService.updateMovie(id, values);
      const updatedMovie = new Movie(data);
      return {
        success: true,
        data: updatedMovie
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: error.message
      };
    }
  }
};
