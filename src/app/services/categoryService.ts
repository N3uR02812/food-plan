import { ODataBasicService } from './oDataBasicService';
import { Category } from '../models/category';
import { Injectable, Inject } from '@angular/core';
import { ODataService } from 'odata-v4-ng';
import { APP_CONFIG } from '../helper/injectionTokens';

@Injectable()
export class CategoryService extends ODataBasicService<Category> {
  constructor(odataService: ODataService, @Inject(APP_CONFIG) config: any) {
    super(odataService, config);
    this.setName = 'Category';
  }
}
