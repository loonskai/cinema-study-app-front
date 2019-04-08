import axios from 'axios';
import { apiKey } from '../credentials';

import apiService from './Api';
import Movie from '../classes/Movie';

import { MovieAPIType, ExternalAPIMovie } from '../interfaces/Api';

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

  async getAll(): Promise<Movie[] | null> {
    try {
      const res = await apiService.getMovies();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return res.data.map(movie => new Movie(movie));
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
  }
};
