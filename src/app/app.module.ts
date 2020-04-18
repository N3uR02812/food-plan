import { NgModule, ApplicationModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ODataModule, ODataService } from 'odata-v4-ng';
import { ContainerService } from './services/containerService';
import { ODataBasicService } from './services/oDataBasicService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContainerItemsService } from './services/containerItemsService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerItemsComponent } from './components/containerItem/containersItems/containersItems.component';
import { AppService } from './services/appService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ContainerItemsDetailsComponent } from './components/containerItem/containersItemDetails/containersItemDetails.component';
import { Ng5SliderModule } from 'ng5-slider';
import { DomSanitizerPipe } from './pipes/blobToImg.pipe';
import { CardComponent } from './components/card/card.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PercentagePipe } from './pipes/percentage.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { BarColorPipe } from './pipes/barColor.pipe';
import { NgInitDirective } from './helper/ngInit.directive';
import { ContainerDetailsComponent } from './components/container/containersDetails/containersDetails.component';
import { ContainersComponent } from './components/container/containers/containers.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    HeaderComponent,
    ContainerItemsComponent,
    ContainerDetailsComponent,
    ContainerItemsDetailsComponent,
    PageNotFoundComponent,
    ModalComponent,
    DomSanitizerPipe,
    PercentagePipe,
    BarColorPipe,
    CardComponent,
    NgInitDirective
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    Ng2ImgMaxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgSelectModule,
    BrowserModule,
    ApplicationModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    ODataModule,
    FormsModule,
    MatDialogModule,
    Ng5SliderModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    NgbModule
  ],
  providers: [AppService, ContainerService, ContainerItemsService, ODataBasicService, ODataService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    ContainerDetailsComponent,
    ContainerItemsDetailsComponent]
})
export class AppModule { }
