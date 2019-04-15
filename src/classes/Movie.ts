export default class Movie {
  public id: number;
  public title: string;
  public overview: string;
  public poster: string;

  constructor(json: any) {
    const posterPath =
      json.poster || `https://image.tmdb.org/t/p/w500${json.poster_path}`;
    this.id = json.id;
    this.title = json.title;
    this.overview = json.overview;
    this.poster = posterPath;
  }
}
