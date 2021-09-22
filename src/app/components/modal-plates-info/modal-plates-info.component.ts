import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { itemOfOrder } from 'src/app/interfaces/products';
@Component({
  selector: 'app-modal-plates-info',
  templateUrl: './modal-plates-info.component.html',
  styleUrls: ['./modal-plates-info.component.scss'],
})
export class ModalPlatesInfoComponent implements OnInit {

  @ViewChild('Slides',{ static: true }) Slides: IonSlides;
  @Input() Item:itemOfOrder;
  @Input() idTab:string


  public viewEntered:boolean = false
  public sliderOpts:any = null
  public addButton: boolean = false

  private arr: any[] = []
 
  constructor(
    private ModalController:ModalController,
    private Router:Router,
    private LocalStorageService:LocalStorageService
  ){
    
  }

  async ionViewDidEnter() {
    this.viewEntered = true;
    this.arr = (await this.LocalStorageService.get('orderHesperia'));
    if(this.arr.filter(element => element.product.id === this.Item.product.id).length > 0){
      this.addButton = true
    } 
    this.Item.cantProduct=1
    
  }
  
  async ngOnInit() {
    await this.LocalStorageService.set('orderHesperia',this.arr);
    this.sliderOpts ={
      effect: 'slide',
      initialSlide: 0,
    }
  }

  async closeModal(){
    await this.ModalController.dismiss()
  }
  
  async addCarrito(){
    delete this.Item.product.image
    delete this.Item.product.description
    console.log(this.Item);
    if(!this.arr.includes(this.Item)){        
      this.arr.push(this.Item)
        await this.LocalStorageService.update('orderHesperia',this.arr)
        this.addButton=true
        this.Router.navigateByUrl(`orders/table/${this.idTab}`)
        await this.ModalController.dismiss()
    }
  }
  
}
