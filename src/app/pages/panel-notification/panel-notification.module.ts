import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelNotificationPageRoutingModule } from './panel-notification-routing.module';

import { PanelNotificationPage } from './panel-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelNotificationPageRoutingModule
  ],
  declarations: [PanelNotificationPage]
})
export class PanelNotificationPageModule {}
