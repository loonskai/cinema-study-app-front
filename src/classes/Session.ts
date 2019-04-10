import moment from 'moment';
import {
  SessionAPIType,
  MovieAPIType,
  HallAPIType,
  SeatItem
} from '../interfaces/Api';

const parseSeatItemsSortedObject = (itemsArray: SeatItem[]) =>
  itemsArray.reduce(
    (acc, item) => {
      acc[item.row] = acc[item.row]
        ? acc[item.row].concat(item.seat)
        : [item.seat];
      return acc;
    },
    {} as { [key: string]: number[] }
  );

export default class Session {
  public id: number;
  public movieID: number;
  public hallID: number;
  private _date!: string;
  private _movie: MovieAPIType;
  private _hall: HallAPIType;
  private _ordered: SeatItem[];
  private _reserved: SeatItem[];

  constructor(json: SessionAPIType) {
    this.id = json.id as number;
    this.date = json.date.toString();
    this.movieID = json['movie-id'];
    this.hallID = json['hall-id'];
    this._hall = json.hall;
    this._movie = json.movie;
    this._ordered = json.ordered || [];
    this._reserved = json.reserved || [];
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
    return this._hall.cinema.city;
  }

  get cinemaTitle() {
    return this._hall.cinema.title;
  }

  get cinemaID() {
    return this._hall.cinema.id;
  }

  get movie() {
    return this._movie;
  }

  get rows() {
    const sortedOrderedObject = parseSeatItemsSortedObject(this._ordered);
    const sortedReservedObject = parseSeatItemsSortedObject(this._reserved);
    return this._hall.rows.map(row => ({
      ...row,
      reserved: sortedReservedObject[row.id] || [],
      ordered: sortedOrderedObject[row.id] || []
    }));
  }
}
