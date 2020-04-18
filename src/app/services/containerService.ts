import { ODataBasicService } from './oDataBasicService';
import { Container } from '../models/container';
import { Injectable } from '@angular/core';
import { ODataService } from 'odata-v4-ng';

@Injectable()
export class ContainerService extends ODataBasicService<Container> {
    constructor(odataService: ODataService) {
      super(odataService);
      this.setName = "Containers";
    }
}
