import { v4 as uuid } from 'uuid';
import { Base } from './base';

export class ViewModelBase extends Base {

  public isDeleted: boolean;
  public isCreated: boolean;
  public isEdited: boolean;

  constructor() {
    super();
    this.isDeleted = false;
    this.isCreated = false;
    this.isEdited = false;
  }
}
