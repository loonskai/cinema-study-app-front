import { MovieAPIType } from '../interfaces/Api';

export default class Movie {
  readonly apiPosterUri = 'https://image.tmdb.org/t/p/w500';
  public title: string;
  public overview: string;
  public posterPath: string;

  constructor(json: MovieAPIType) {
    this.title = json.original_title;
    this.overview = json.overview;
    this.posterPath = json.poster_path;
  }

  get poster(): string {
    return `${this.apiPosterUri}${this.posterPath}`;
  }
}
