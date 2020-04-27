import { Component, OnInit, Query, OnDestroy } from '@angular/core';
import { Container } from 'src/app/models/container';
import { ContainerItemsService } from 'src/app/services/containerItemsService';
import { ContainerItem } from 'src/app/models/ContainerItem';
import { AppService } from 'src/app/services/appService';
import { v4 as uuid } from 'uuid';
import { switchMap, toArray } from 'rxjs/operators';
import { ODataQuery } from 'odata-v4-ng';
import { QueryBuilder } from 'src/app/helper/queryBuilder';
import { ContainerItemsDetailsComponent } from '../containersItemDetails/containersItemDetails.component';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from 'src/app/services/containerService';
import { of } from 'rxjs/internal/observable/of';
import { Subscription, from } from 'rxjs';
import { ButtonInfo } from 'src/app/helper/buttonInfo';
import { AmountTypes } from 'src/app/helper/amountType';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-containersItems',
  templateUrl: './containersItems.component.html',
  styleUrls: ['./containersItems.component.scss']
})
export class ContainerItemsComponent implements OnInit, OnDestroy {
  public items: ContainerItem[] = [];

  public filter: string = null;
  public containerId: string = null;
  public categoryId: string = null;

  public today = new Date();

  private subscriptions: Subscription[] = [];
  public buttons: ButtonInfo[] = [
    new ButtonInfo('btn-danger', 'fa-edit', this.details),
    new ButtonInfo('btn-primary', 'fa-trash', this.remove),
  ];

  constructor(
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
    public containerItemsService: ContainerItemsService,
    public appService: AppService,
    public containerService: ContainerService
  ) { }

  ngOnInit(): void {
    const addSub = this.appService.addPressed.subscribe(() => {
      this.add();
    });

    const reloadSub = this.appService.reloadPressed
      .pipe(
        switchMap(_ => {
          return this.load();
        })
      )
      .subscribe(list => (this.items = list));

    const searchSub = this.appService.searchPressed.subscribe(value => {
      this.search(value);
    });

    this.subscriptions.push(addSub, reloadSub, searchSub);

    this.activeRoute.queryParams.pipe(
      switchMap(params => {
        if (params.container) {
          this.containerId = params.container;
        }
        else if (params.category) {
          this.categoryId = params.category;
        }
        else {
          this.containerId = null;
        }

        return this.load().pipe(
          switchMap(list => {
            this.items = list;
            return of(null);
          })
        );
      })
    )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }

  load() {
    let obs = of([]);
    if (this.containerId) {
      obs = this.containerItemsService.getFilter(
        'ContainerId eq \'' + this.containerId + '\''
      );
    }
    else if (this.categoryId) {
      obs = this.containerItemsService.getFilter(
        'ContainerId eq \'' + this.categoryId + '\''
      );
    }
    else {
      obs = this.containerItemsService
        .getList();
    }

    return obs.pipe(switchMap(items => {
      return from(items)
        .pipe(switchMap(item => {
          item.ExpireDate = item.ExpireDate ? new Date(item.ExpireDate) : null;
          return of(item);
        }))
        .pipe(toArray());
    }));
  }

  search(value: string) {
    if (value.length === 0) {
      this.filter = null;
    }
    else {
      this.filter = value;
    }
    // if (value.length === 0) {
    //   this.load().subscribe(list => (this.items = list));
    // }
    // const query = QueryBuilder.getQueryAllInObj(new ContainerItem(), value);
    // return this.containerItemsService.getFilter(query).subscribe(list => {
    //   this.items = list;
    // });
  }

  details(item: ContainerItem) {
    const dialogRef = this.dialog.open(ContainerItemsDetailsComponent, {
      data: {
        isCreate: false,
        item: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.containerItemsService.patch(result, result.Id).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });
  }

  add() {
    const newItem = {
      Attributes: '',
      Amount: 1,
      CurrentAmount: 1,
      AmountType: AmountTypes[0],
      Image: null,
      ExpireDate: null,
      ContainerId: this.containerId,
      Id: uuid(),
      Name: 'New',
      Code: '',
      Description: '-New-'
    } as ContainerItem;

    const dialogRef = this.dialog.open(ContainerItemsDetailsComponent, {
      data: {
        isCreate: true,
        item: Object.assign({}, newItem)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.containerItemsService.post(result).subscribe(() => {
          this.appService.reloadPressedSubject.next();
        });
      }
    });
  }

  getDayDifference(date1: Date, date2: Date) {
    if (date1 == null || date2 == null) {
      return 0;
    }
    // To calculate the time difference of two dates
    var time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var days = time / (1000 * 3600 * 24);
    return days;
  }

  getPercentage(item: ContainerItem) {
    if (item.Amount === 0) {
      return 0;
    }
    return item.CurrentAmount / item.Amount;
  }

  remove(item: ContainerItem) {
    this.containerItemsService
      .delete(item.Id)
      .pipe(
        switchMap(_ => {
          return this.load();
        })
      )
      .subscribe(list => (this.items = list));
  }
}
