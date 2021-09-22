import { ModalViewOrderComponent } from './modal-view-order/modal-view-order.component';
import { ModalPlatesInfoComponent } from './modal-plates-info/modal-plates-info.component';
import { PlatesComponent } from './plates/plates.component';
import { TableComponent } from './table/table.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { TimePipe } from "./../pipes/timePipe/time.pipe";
@NgModule({
  declarations: [
    HomeCardComponent,
    TableComponent,
    PlatesComponent,
    ModalPlatesInfoComponent,
    ModalViewOrderComponent,
    TimePipe
  ],
  exports:[
    HomeCardComponent,
    TableComponent,
    PlatesComponent,
    ModalPlatesInfoComponent,
    ModalViewOrderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentModule { }
