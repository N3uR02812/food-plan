import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { ContainerService } from 'src/app/services/containerService';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CategoryService } from 'src/app/services/categoryService';
import { Container } from 'src/app/models/container';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute,
    public containerService: ContainerService,
    public categoryService: CategoryService,
    public appService: AppService) { }

  public show: boolean = false;
  public searchText: string = '';
  public label: string = '';
  public container: Container = null;
  public category: Category = null;

  ngOnInit(): void {
    this.activeRoute.queryParams.pipe(switchMap(params => {
      if (params.container) {
        return this.containerService.get(params.container)
          .pipe(switchMap(container => {
            this.container = container;
            return of(container);
          }));
      }
      else if (params.category) {
        return this.categoryService.get(params.category)
          .pipe(switchMap(category => {
            this.category = category;
            return of(category);
          }));
      }
      this.container = null;
      this.category = null;
      return of(null);
    })).subscribe();
  }

  search() {
    this.appService.searchPressedSubject.next(this.searchText);
  }

  add() {
    this.appService.addPressedSubject.next();
  }

}
