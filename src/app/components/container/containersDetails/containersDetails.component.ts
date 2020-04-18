import { Component, OnInit, Input, Inject } from "@angular/core";
import { Container } from "src/app/models/container";
import { ContainerItemsService } from "src/app/services/containerItemsService";
import { ContainerItem } from "src/app/models/ContainerItem";
import { AppService } from "src/app/services/appService";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContainerService } from 'src/app/services/containerService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-containersDetails",
  templateUrl: "./containersDetails.component.html",
  styleUrls: ["./containersDetails.component.scss"]
})
export class ContainerDetailsComponent implements OnInit {

  @Input() item: ContainerItem = new ContainerItem();
  @Input() isCreate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public containerService: ContainerService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
  }

  save() {
      if (this.isCreate) {
        this.containerService.post(this.item).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
      else {
        this.containerService.patch(this.item, this.item.Id).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
  }
}
