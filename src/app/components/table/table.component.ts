import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlatesComponent } from './../plates/plates.component';
import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  public Categorys:any[]=[]

  constructor(
    private coreConectionService:CoreConectionService,
    private uiComponentsService:UiComponentsService,
    private localStorageService:LocalStorageService
  ) { }

  async ngOnInit() {
    this.coreConectionService.findArray('categorys')
      .then(e=>{
        this.Categorys=e
      })

      await this.localStorageService.set('urlHesperia',{ urlHesperia:`http://192.168.0.102:1337`})
  }

  onSelect(category:any){
    this.uiComponentsService.showModal({
      component:PlatesComponent,
      componentProps:{
        Category:category
      }
    })
  }

}
