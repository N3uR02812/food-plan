import { Base } from './base';
import { Container } from "./container";
import { v4 as uuid } from 'uuid';
import { Category } from './category';


export class ContainerItem extends Base {


  public Attributes: string;

  public Amount:number;

  public CurrentAmount: number;

  public ExpireDate?: Date;

  public AmountType: string;

  public Image: string;

  public ContainerId:string

  public Container:Container;

  public Categories:Category[];

  constructor() {
    super();
    this.Attributes= "",
    this.Amount=0,
    this.CurrentAmount= 0,
    this.ExpireDate = null;
    this.AmountType= "Stück",
    this.Image= null,
    this.ContainerId= null,
    this.Id= uuid(),
    this.Name= "New",
    this.Code= "",
    this.Description= "-New-"
  }

}
