import { ODataBasicService } from './oDataBasicService';
import { Container } from '../models/container';
import { Injectable, Inject } from '@angular/core';
import { ODataService } from 'odata-v4-ng';
import { APP_CONFIG } from '../helper/injectionTokens';

@Injectable()
export class ContainerService extends ODataBasicService<Container> {
    constructor(odataService: ODataService, @Inject(APP_CONFIG) config: any) {
      super(odataService, config);
      this.setName = "Container";
    }
}
