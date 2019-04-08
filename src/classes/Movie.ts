import { ExternalAPIMovie, MovieAPIType } from '../interfaces/Api';

export default class Movie {
  public id: number;
  public title: string;
  public overview: string;
  public poster: string;

  constructor(json: ExternalAPIMovie | MovieAPIType) {
    const posterPath =
      json.poster || `https://image.tmdb.org/t/p/w500${json.poster_path}`;
    this.id = json.id;
    this.title = json.title;
    this.overview = json.overview;
    this.poster = posterPath;
  }
}
