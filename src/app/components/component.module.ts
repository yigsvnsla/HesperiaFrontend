import { ModalPlatesInfoComponent } from './modal-plates-info/modal-plates-info.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { PlatesComponent } from './plates/plates.component';
import { TableComponent } from './table/table.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';

@NgModule({
  declarations: [
    HomeCardComponent,
    TableComponent,
    PlatesComponent,
    FabButtonComponent,
    ModalPlatesInfoComponent
  ],
  exports:[
    HomeCardComponent,
    TableComponent,
    PlatesComponent,
    FabButtonComponent,
    ModalPlatesInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentModule { }
