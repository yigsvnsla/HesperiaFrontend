import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelNotificationPage } from './panel-notification.page';

const routes: Routes = [
  {
    path: '',
    component: PanelNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelNotificationPageRoutingModule {}
