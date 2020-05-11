import { ODataBasicService } from './oDataBasicService';
import { ContainerItem } from '../models/containerItem';
import { Injectable } from '@angular/core';
import { ODataService } from 'odata-v4-ng';
import { CategoryContainerItemRelationService } from './categoryContainerItemRelationService';
import { switchMap, map, concatMap, filter, flatMap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from './categoryService';
import { CategoryContainerItemRelation } from '../models/categoryContainerItemRelation';
import { AppService } from './appService';
import * as _ from 'lodash';

@Injectable()
export class ContainerItemsService extends ODataBasicService<ContainerItem> {
  constructor(
    public appService: AppService,
    public categoryContainerItemRelationService: CategoryContainerItemRelationService,
    odataService: ODataService) {
    super(odataService);
    this.setName = 'ContainerItem';
  }

  public getCategoryRelation(key: string): Observable<CategoryContainerItemRelation[]> {
    return this.categoryContainerItemRelationService
      .getFilter('ContainerItemRelId eq \'' + key + '\'')
      .pipe(flatMap(rel => {
        if (rel.length === 0) {
          return of([]);
        }
        const ids = rel.map(r => r.CategoryRelId);
        return of(rel);
      }));
  }

  public setCategories(key: string, categories: Category[]) {
    // Get all Relations
    return this.categoryContainerItemRelationService
      .getFilter('ContainerItemRelId eq \'' + key + '\'')
      .pipe(concatMap(relations => {
        // Now delete old Relations
        if (relations.length === 0) {
          return of(null);
        }

        return from(relations)
          .pipe(concatMap(rel => this.deleteRelation(rel.Id)));
      }))
      .pipe(switchMap(() => {

        if (categories == null || categories.length === 0) {
          return of(null);
        }

        return from(categories)
          .pipe(map(category => new CategoryContainerItemRelation(key, category.Id)))
          .pipe(concatMap(relation => this.addRelation(relation)));
      }));
  }

  private addRelation(relation: CategoryContainerItemRelation) {
    return this.categoryContainerItemRelationService.post(relation);
  }

  private deleteRelation(key: string) {
    return this.categoryContainerItemRelationService.delete(key);
  }
}
