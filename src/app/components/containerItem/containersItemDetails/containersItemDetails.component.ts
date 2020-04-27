import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ContainerItem } from 'src/app/models/ContainerItem';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { AmountTypes } from 'src/app/helper/amountType';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';

@Component({
  selector: 'app-containersItemDetails',
  templateUrl: './containersItemDetails.component.html',
  styleUrls: ['./containersItemDetails.component.scss']
})
export class ContainerItemsDetailsComponent implements OnInit {
  @Input() item: ContainerItem = new ContainerItem();
  @Input() isCreate: boolean = false;

  @ViewChild('fileInput') fileInput: HTMLElement = null;

  public amountTypes = null;
  public active: string = null;
  public activeTabIndex: number = 0;
  public tabs: string[] = [
    'general', 'image', 'amount', 'expiredate', 'finish'
  ];

  public categories: Category[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public containerService: CategoryService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {
    if (data != null) {
      this.item = data.item;
      this.isCreate = data.isCreate;
    }
    this.amountTypes = AmountTypes
      .map(key => {
        return { value: key }
      });
  }

  ngOnInit(): void {
    this.active = this.tabs[this.activeTabIndex];

    this.containerService.getList().subscribe(categories => {
      this.categories = categories;

      this.item.Categories = this.categories.filter((c) => {
        return this.item.Categories
          .findIndex((ci) => ci.Id === c.Id);
      });
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  fileChange(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ng2ImgMaxService.resize([file], 200, 200)
        .subscribe((result) => {
          const fr = new FileReader();
          fr.onload = (loadEvent: any) => {
            const base64 = loadEvent.target.result;
            this.item.Image = base64;
          };
          fr.readAsDataURL(result);
        });
    }
  }
}
