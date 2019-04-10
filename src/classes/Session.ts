import moment from 'moment';
import { SessionAPIType } from '../interfaces/Api';

export default class Session {
  public id: number;
  public movieID: number;
  public hallID: number;
  private _date!: string;

  constructor(json: SessionAPIType) {
    this.id = json.id as number;
    this.date = json.date.toString();
    this.movieID = json['movie-id'];
    this.hallID = json['hall-id'];
  }

  set date(value) {
    this._date = value;
  }

  get date() {
    return moment(this._date).format('LLLL');
  }
}
