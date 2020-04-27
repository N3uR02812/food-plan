import { NgModule, ApplicationModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ODataModule, ODataService } from 'odata-v4-ng';
import { ContainerService } from './services/containerService';
import { ODataBasicService } from './services/oDataBasicService';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { DomSanitizerPipe } from './pipes/blobToImg.pipe';
import { CardComponent } from './components/card/card.component';
import { PercentagePipe } from './pipes/percentage.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgInitDirective } from './helper/ngInit.directive';
import { ContainerDetailsComponent } from './components/container/containersDetails/containersDetails.component';
import { ContainersComponent } from './components/container/containers/containers.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { CategoryDetailsComponent } from './components/category/categoriesDetails/categoriesDetails.component';
import { CategoryService } from './services/categoryService';
import { TransparencyPipe } from './pipes/transparency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    ContainerItemsComponent,
    ContainerDetailsComponent,
    ContainerItemsDetailsComponent,
    PageNotFoundComponent,
    ModalComponent,
    DomSanitizerPipe,
    PercentagePipe,
    TransparencyPipe,
    CardComponent,
    NgInitDirective
  ],
  imports: [
    Ng2ImgMaxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    ApplicationModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    ODataModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MaterialFileInputModule
  ],
  providers: [AppService,
    ContainerService,
    ContainerItemsService,
    CategoryService,
    ODataBasicService,
    ODataService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    CategoryDetailsComponent,
    ContainerDetailsComponent,
    ContainerItemsDetailsComponent]
})
export class AppModule { }
