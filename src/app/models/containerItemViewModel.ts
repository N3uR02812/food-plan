import { Category } from './category';
import { ContainerItem } from './ContainerItem';


export class ContainerItemViewModel extends ContainerItem {

  public Categories: Category[];

  constructor(item: ContainerItem) {
    super();
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
    }
    this.Categories = [];
  }

}
