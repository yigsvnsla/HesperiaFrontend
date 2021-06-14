import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private coreConectionService:CoreConectionService,
    private uiComponentsService:UiComponentsService
  ) { }

  ngOnInit() {}

  async sendPush(){
    this.coreConectionService.genericUpload('notifications',{
      table:{
        getService: true,
        idTable: this.activatedRoute.snapshot.params.id
      }
    }).then( async e=>{
      if(e == false){
        this.uiComponentsService.showToast("Tranqui ya vienen a atenderte.")
      }else{
        this.uiComponentsService.showToast("Un mesero ya viene en camino.")
        console.log("success")
      }
    })
  }

} 
