import { ODataBasicService } from './oDataBasicService';
import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { ODataService } from 'odata-v4-ng';

@Injectable()
export class CategoryService extends ODataBasicService<Category> {
    constructor(odataService: ODataService) {
      super(odataService);
      this.setName = 'Category';
    }
}
