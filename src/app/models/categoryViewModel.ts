import { Category } from './category';
import { ViewModelBase } from './viewModelBase';


export class CategoryViewModel extends ViewModelBase {

  public Logo: string;

  public Color: string;

  constructor(item: Category) {
    super();
    if (item != null) {
      Object.keys(item).forEach(key => {
        this[key] = item[key];
      });
    }
  }
}
