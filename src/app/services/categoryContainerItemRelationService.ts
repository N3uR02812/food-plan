import { ODataBasicService } from './oDataBasicService';
import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { ODataService } from 'odata-v4-ng';
import { CategoryContainerItemRelation } from '../models/categoryContainerItemRelation';

@Injectable()
export class CategoryContainerItemRelationService extends ODataBasicService<CategoryContainerItemRelation> {
    constructor(odataService: ODataService) {
      super(odataService);
      this.setName = 'CategoryContainerItemRelation';
    }
}
