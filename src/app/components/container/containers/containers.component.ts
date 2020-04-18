import { Component, OnInit, OnDestroy } from '@angular/core';
import { Container } from 'src/app/models/container';
import { ContainerService } from 'src/app/services/containerService';
import { AppService } from 'src/app/services/appService';
import { v4 as uuid } from 'uuid';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContainerDetailsComponent } from '../containersDetails/containersDetails.component';
import { ButtonInfo } from 'src/app/helper/buttonInfo';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit, OnDestroy {
  public items: Container[] = [];
  private subscriptions: Subscription[] = [];
  public buttons: ButtonInfo[] = [
    new ButtonInfo('btn-success', 'fa-edit', this.details),
    new ButtonInfo('btn-primary', 'fa-level-down-alt', this.remove),
    new ButtonInfo('btn-danger', 'fa-trash', this.remove)
  ];

  constructor(
    public containerService: ContainerService,
    public dialog: MatDialog,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    const sub = this.appService.addPressed.subscribe(() => {
      this.add();
    });

    const reloadSub = this.appService.reloadPressed
      .pipe(
        switchMap(_ => {
          return this.load();
        })
      )
      .subscribe(list => (this.items = list));

    this.subscriptions.push(sub, reloadSub);
    this.load().subscribe(list => (this.items = list));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }

  load() {
    return this.containerService.getList();
  }

  details(item: Container) {
    const dialogRef = this.dialog.open(ContainerDetailsComponent, {
      data: {
        isCreate: false,
        item: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.containerService.patch(result, result.Id).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });
  }

  add() {
    const newItem = {
      Capacity: 0,
      Items: [],
      Id: uuid(),
      Name: 'New',
      Code: '',
      Description: '-New-'
    } as Container;

    const dialogRef = this.dialog.open(ContainerDetailsComponent, {
      data: {
        isCreate: true,
        item: Object.assign({}, newItem)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.containerService.post(result).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });


    // const modalRef = this.modalService.open(ContainerDetailsComponent);
    // modalRef.componentInstance.isCreate =  true;
    // modalRef.componentInstance.item = Object.assign({}, newItem);

    // this.containerService
    //   .post(newItem)
    //   .pipe(
    //     switchMap(_ => {
    //       return this.load();
    //     })
    //   )
    //   .subscribe(list => (this.items = list));
  }

  remove(id: string) {
    this.containerService
      .delete(id)
      .pipe(
        switchMap(_ => {
          return this.load();
        })
      )
      .subscribe(list => (this.items = list));
  }
}
