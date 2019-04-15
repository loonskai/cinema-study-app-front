import {
  OrderAPIType,
  MovieAPIType,
  HallAPIType,
  SeatItem
} from '../interfaces/Api';
import Movie from './Movie';
import Bonus from './Bonus';
import Cinema from './Cinema';
import Session from './Session';

export default class Order {
  public id: number;
  public user: {
    id: number;
    email: string;
    username: string;
  };
  public createdAt: Date;
  public seats: SeatItem[];

  private _session: {
    id: number;
    date: Date;
    movie: MovieAPIType;
    hall: HallAPIType;
  };
  private _bonuses: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  private _hall: HallAPIType;

  constructor(json: OrderAPIType) {
    this.id = json.id as number;
    this.user = json.user;
    this.createdAt = json.createdAt;
    this._session = json.session;
    this.seats = json.seats;
    this._bonuses = json.bonuses;
    this._hall = json.session.hall;
  }

  get movie() {
    return new Movie(this._session.movie);
  }

  get bonuses() {
    return this._bonuses.map((bonus: any) => new Bonus(bonus));
  }

  get cinema() {
    return new Cinema(this._hall.cinema);
  }

  get session() {
    return new Session(this._session as any);
  }
}
