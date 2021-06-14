import { TableComponent } from './../../components/table/table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPage } from './restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPage
  },{
    path:'table/:id',
    component:TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPageRoutingModule {}
