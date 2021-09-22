import { Category, ProductOfOrder } from './../../interfaces/products';
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

  @Input() Category:Category
  @Input() idTable:string
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


  async viewProduct(product:any){
    this.uiComponentsService.showModal({
      component:ModalPlatesInfoComponent,
      componentProps:{
        idTab:this.idTable,
        Item:{
          category:this.Category.name,
          product:product.product,
        }
      },
      cssClass: 'ModalPlatesInfoComponent-class',
      backdropDismiss:true,
      keyboardClose:true,
      mode:'ios',
      showBackdrop:true,
      swipeToClose:false,
      id:'plates',
    })
    this.onExit()
  }
}
