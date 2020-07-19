import { Injectable, NgModule, SkipSelf, Optional, InjectionToken } from '@angular/core';
import config from '../../assets/config/production.json';
import { ODataBasicService } from './oDataBasicService';
import { ContainerItemsService } from './containerItemsService';
import { CategoryService } from './categoryService';
import { CategoryContainerItemRelationService } from './categoryContainerItemRelationService';
import { ContainerService } from './containerService';
import { ODataService } from 'odata-v4-ng';
import { APP_CONFIG } from '../helper/injectionTokens';

@NgModule({
     providers: [
         ODataService,
         ODataBasicService,
         ContainerService,
         ContainerItemsService,
         CategoryService,
         CategoryContainerItemRelationService,
     ]
})
export class ServiceModule {
    public static forRoot(config: any) {
         return {
              ngModule: ServiceModule,
              providers: [
                  {provide: APP_CONFIG, useValue: config}
              ]
         };
    }

    public constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
         if(parentModule) {
             throw new Error('ServiceModule has already been imported.');
         }
    }
}