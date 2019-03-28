import { CinemaAPIType } from '../interfaces/Api';

import cinemaService from '../services/Cinema';

export default class Cinema {
  public title: string;
  public city: string;

  private id: number;

  constructor(json: CinemaAPIType) {
    this.id = json.id as number;
    this.title = json.title;
    this.city = json.city;
  }

  public async update(values: CinemaAPIType) {
    const updatedCinema = await cinemaService.update(values);
    return updatedCinema;
  }
}
