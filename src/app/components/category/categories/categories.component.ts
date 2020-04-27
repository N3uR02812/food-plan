import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AppService } from 'src/app/services/appService';
import { v4 as uuid } from 'uuid';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CategoryDetailsComponent } from '../categoriesDetails/categoriesDetails.component';
import { ButtonInfo } from 'src/app/helper/buttonInfo';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public items: Category[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    public containerService: CategoryService,
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

  details(item: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
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
      Id: uuid(),
      Name: 'New',
      Code: '',
      Description: '-New-'
    } as Category;

    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
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


    // const modalRef = this.modalService.open(CategoryDetailsComponent);
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

  remove(item: Category) {
    this.containerService
      .delete(item.Id)
      .pipe(
        switchMap(_ => {
          return this.load();
        })
      )
      .subscribe(list => (this.items = list));
  }
}
