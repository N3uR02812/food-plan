import { v4 as uuid } from 'uuid';

export class Base {

  public Id: string;

  public Name: string;

  public Code: string;

  public Description: string;

  constructor() {
    this.Id = uuid();
    this.Name = '';
    this.Code = '';
    this.Description = '';
  }
}
