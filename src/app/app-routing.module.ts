import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContainerItemsComponent } from './components/containerItem/containersItems/containersItems.component';
import { ContainersComponent } from './components/container/containers/containers.component';
import { CategoriesComponent } from './components/category/categories/categories.component';


const routes: Routes = [
  { path: 'container', component: ContainersComponent },
  { path: 'items', component: ContainerItemsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
