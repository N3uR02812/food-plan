import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ContainerItemsService } from 'src/app/services/containerItemsService';
import { ContainerItem } from 'src/app/models/ContainerItem';
import { AppService } from 'src/app/services/appService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbNavItem, NgbNavbar, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ContainerService } from 'src/app/services/containerService';
import { Options } from 'ng5-slider';
import { AmountTypes } from 'src/app/helper/amountType';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';

@Component({
  selector: 'app-containersItemDetails',
  templateUrl: './containersItemDetails.component.html',
  styleUrls: ['./containersItemDetails.component.scss']
})
export class ContainerItemsDetailsComponent implements OnInit {
  @Input() item: ContainerItem = new ContainerItem();
  @Input() isCreate: boolean = false;

  @ViewChild('nav') nav: NgbNav = null;
  @ViewChild('fileInput') fileInput: HTMLElement = null;

  public amountTypes = AmountTypes;
  public options: Options = null;
  public active: string = null;
  public activeTabIndex: number = 0;
  public tabs: string[] = [
    'general', 'image', 'amount', 'expiredate', 'finish'
  ];

  constructor(
    public activeModal: NgbActiveModal,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public containerService: ContainerService,
    public containerItemsService: ContainerItemsService,
    public appService: AppService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    this.options = {
      floor: 0,
      ceil: this.item.Amount,
      step: 0.01
    };

    this.active = this.tabs[this.activeTabIndex];
  }

  onActiveIdChange($event) {
    const foundIdx = this.tabs.indexOf($event);
    if (foundIdx >= 0) {
      this.activeTabIndex = foundIdx;
      this.nav.select(this.tabs[this.activeTabIndex]);
    }
  }

  next() {
    if (this.activeTabIndex < this.tabs.length) {
      this.activeTabIndex++;
      this.nav.select(this.tabs[this.activeTabIndex]);
    }
  }

  finish() {
    const next = 4;
    this.nav.select(this.tabs[this.tabs.length - 1]);
  }

  back() {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex--;
      this.nav.select(this.tabs[this.activeTabIndex]);
    }
  }

  save() {
    if (this.isCreate) {
      this.containerItemsService.post(this.item).subscribe(() => {
        this.activeModal.close();
        this.appService.reloadPressedSubject.next();
      });
    } else {
      this.containerItemsService.patch(this.item, this.item.Id).subscribe(() => {
        this.activeModal.close();
        this.appService.reloadPressedSubject.next();
      });
    }
  }

  maxAmountChange(max: number) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = max;
    this.options = newOptions;
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
