import { ModalViewOrderComponent } from './../../components/modal-view-order/modal-view-order.component';
import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { order } from './../../interfaces/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-notification',
  templateUrl: './panel-notification.page.html',
  styleUrls: ['./panel-notification.page.scss'],
})
export class PanelNotificationPage implements OnInit {

  public arrList:any[]
  constructor(
    private coreConectionService: CoreConectionService,
    private uiComponentsService: UiComponentsService
    ) { 
    this.arrList = []    
    }

  ionViewWillEnter(){
    /////////////////////////////////////////////////////
    this.coreConectionService.getNotification()
      .subscribe(data=>{
        if ( JSON.stringify(data) !== JSON.stringify(this.arrList)){
          for(let i of data){
            if (!this.arrList.some(val => val.comanda.idTable === i.comanda.idTable)) {
              this.arrList.push(i)
            }
          }
      
      }
    })
    /////////////////////////////////////////////////////
  }    


  async ngOnInit() {
    this.arrList = await this.coreConectionService.findArray('notifications')
  }

  async onDelete(id: number,index:number) {
    this.arrList.splice(index)
    this.coreConectionService.delete(`notifications/${id}`)
  }

  viewInfo(order:order){ 
    this.uiComponentsService.showModal({
      component:ModalViewOrderComponent,
      cssClass: 'my-custom-class-viewInfo',
      componentProps:{
        Order:order
      }
    })
  }

}
