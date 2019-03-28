import { HallAPIType } from '../interfaces/Api';

export default class Hall {
  public id: number;
  public cinemaID: number;
  public title: string;

  constructor(json: HallAPIType) {
    this.id = json.id as number;
    this.title = json.title;
    this.cinemaID = json.cinemaID;
  }

  /*   public async update(values: CinemaAPIType) {
    const updatedCinema = await cinemaService.update(values);
    return updatedCinema;
  } */
}
