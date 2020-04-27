import { ODataBasicService } from './oDataBasicService';
import { ContainerItem } from '../models/containerItem';
import { Injectable } from '@angular/core';
import { ODataService } from 'odata-v4-ng';

@Injectable()
export class ContainerItemsService extends ODataBasicService<ContainerItem> {
  constructor(odataService: ODataService) {
    super(odataService);
    this.setName = "ContainerItem";
  }
}
