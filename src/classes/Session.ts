import moment from 'moment';
import { SessionAPIType, CinemaAPIType, MovieAPIType } from '../interfaces/Api';

export default class Session {
  public id: number;
  public movieID: number;
  public hallID: number;
  private _date!: string;
  private _cinema: CinemaAPIType;
  private _movie: MovieAPIType;

  constructor(json: SessionAPIType) {
    this.id = json.id as number;
    this.date = json.date.toString();
    this.movieID = json['movie-id'];
    this.hallID = json['hall-id'];
    this._cinema = json.hall.cinema;
    this._movie = json.movie;
  }

  set date(value) {
    this._date = value;
  }

  get date() {
    return moment(this._date).format('LL');
  }

  get time() {
    return moment(this._date).format('LT');
  }

  get city() {
    return this._cinema.city;
  }

  get cinemaTitle() {
    return this._cinema.title;
  }

  get cinemaID() {
    return this._cinema.id;
  }

  get movie() {
    return this._movie;
  }
}
