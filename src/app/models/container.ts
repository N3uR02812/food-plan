import { Base } from './base';
import { ContainerItem } from "./ContainerItem";


export class Container extends Base {

  public Capacity: number;

  public Items:ContainerItem[]

  constructor() {
    super();
  }
}
