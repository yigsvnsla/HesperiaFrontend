import { ModalPlatesInfoComponent } from './../../components/modal-plates-info/modal-plates-info.component';
import { UiComponentsService } from 'src/app/services/ui-components.service';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private localStorageService:LocalStorageService,
  ) {
    
  }

  async ngOnInit(){
    await this.localStorageService.set('urlHesperia',{ urlHesperia:`http://192.168.0.102:1337`})
  }
  
}
