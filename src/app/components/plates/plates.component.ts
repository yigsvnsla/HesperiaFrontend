import { UiComponentsService } from 'src/app/services/ui-components.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ModalPlatesInfoComponent } from '../modal-plates-info/modal-plates-info.component';

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.scss'],
})
export class PlatesComponent implements OnInit {

  @Input() Category:any
  
  constructor(
    private modalController:ModalController,
    private uiComponentsService:UiComponentsService
  ) { }

  ngOnInit() {
  }

  onExit(){
    this.modalController.dismiss()
  }

  getImage(string:string):string{
    return '/api/'+ string
  }


  viewProduct(product:any){
    this.uiComponentsService.showModal({
      component:ModalPlatesInfoComponent,
      componentProps:{
        Item:product
      },
      cssClass: 'ModalPlatesInfoComponent-class',
      backdropDismiss:true,
      keyboardClose:true,
      mode:'ios',
      showBackdrop:true,
      swipeToClose:false
    })
  }

}
