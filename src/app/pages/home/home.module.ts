import { ComponentModule } from '../../components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentModule,
  ],
  declarations: [HomePage],
  providers:[
    LocalStorageService,
  ]
})
export class HomePageModule {}
