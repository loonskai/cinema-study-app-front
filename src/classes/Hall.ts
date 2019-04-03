import { HallAPIType } from '../interfaces/Api';

export default class Hall {
  public id: number;
  public cinemaID: number | string;
  public title: string;

  constructor(json: HallAPIType) {
    this.id = json.id as number;
    this.title = json.title;
    this.cinemaID = json['cinema-id'];
  }
}
