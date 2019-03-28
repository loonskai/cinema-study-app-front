import { CinemaAPIType } from '../interfaces/Api';

export default class Cinema {
  public title: string;
  public city: string;

  constructor(json: CinemaAPIType) {
    this.title = json.title;
    this.city = json.city;
  }
}
