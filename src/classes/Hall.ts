import { HallAPIType } from '../interfaces/Api';
import { RowItem } from '../components/admin/elements/NewRowController';

export default class Hall {
  public id: number;
  public cinemaID: number | string;
  public title: string;
  public rows: RowItem[];

  constructor(json: HallAPIType) {
    this.id = json.id as number;
    this.title = json.title;
    this.cinemaID = json['cinema-id'];
    this.rows = json.rows;
  }
}
