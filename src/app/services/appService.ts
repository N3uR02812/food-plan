import { Injectable, InjectionToken } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from './categoryService';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import config from '../../assets/config/production.json';

@Injectable()
export class AppService {

  categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  configSubject: BehaviorSubject<any> = new BehaviorSubject(config);
  reloadPressedSubject: Subject<void> = new Subject<void>();
  addPressedSubject: Subject<void> = new Subject<void>();
  searchPressedSubject: Subject<string> = new Subject<string>();

  constructor(private categoryService: CategoryService) {
    this.reloadPressed.subscribe(() => this.reloadCategories().subscribe());
    this.reloadCategories().subscribe();
    this.categoriesSubject.subscribe(data => { console.log(data.length); })
  }

  get Categories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  get Config(): Observable<any> {
    return this.configSubject.asObservable();
  }

  reloadCategories(): Observable<Category[]> {
    return this.categoryService.getList().pipe(switchMap(categories => {
      this.categoriesSubject.next(categories);
      return of(categories);
    }));
  }

  get label(): Observable<string> {
    return this.searchPressedSubject.asObservable();
  }

  get searchPressed(): Observable<string> {
    return this.searchPressedSubject.asObservable();
  }

  get reloadPressed(): Observable<void> {
    return this.reloadPressedSubject.asObservable();
  }

  get addPressed(): Observable<void> {
    return this.addPressedSubject.asObservable();
  }


}
