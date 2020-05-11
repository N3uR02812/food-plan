import { Base } from './base';
import { ContainerItem } from './ContainerItem';
import { Category } from './category';

export class CategoryContainerItemRelation extends Base {

  public ContainerItemRel: ContainerItem;

  public CategoryRel: Category;

  public ContainerItemRelId: string;

  public CategoryRelId: string;

  constructor(containerId: string, categoryId: string) {
    super();

    this.ContainerItemRelId = containerId;
    this.CategoryRelId = categoryId;
  }
}
