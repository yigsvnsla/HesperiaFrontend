import { HttpClientModule } from '@angular/common/http';
import { UiComponentsService } from './services/ui-components.service';
import { CoreConectionService } from './services/core-conection.service';
import { LocalStorageService } from './services/local-storage.service';
import { ComponentModule } from './components/component.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    LocalStorageService,
    CoreConectionService,
    UiComponentsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
