import { Base } from './base';
import { ContainerItem } from './ContainerItem';


export class Category extends Base {

  public Logo: string;

  public Color: string;

  public Items: ContainerItem[];

  constructor() {
    super();
  }
}
