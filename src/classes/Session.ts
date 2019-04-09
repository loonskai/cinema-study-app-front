import { SessionAPIType } from '../interfaces/Api';

export default class Session {
  public id: number;
  public date: string;
  public movieID: number;
  public hallID: number;

  constructor(json: SessionAPIType) {
    this.id = json.id as number;
    this.date = json.date.toString();
    this.movieID = json['movie-id'];
    this.hallID = json['hall-id'];
  }
}
