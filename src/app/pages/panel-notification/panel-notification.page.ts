import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-notification',
  templateUrl: './panel-notification.page.html',
  styleUrls: ['./panel-notification.page.scss'],
})
export class PanelNotificationPage implements OnInit {

  public arrList:any[]

  constructor(
    private coreConectionService:CoreConectionService,
    private uiComponentsService:UiComponentsService

  ) { }

  async ngOnInit() {

    this.arrList = await this.coreConectionService.getNotification()

    setInterval(async ()=>{
      let newArr = await this.coreConectionService.getNotification()
      if(this.arrList.toString() != newArr.toString()){
        for (const i of newArr) {
          if(!this.arrList.includes(i)){
            this.arrList = newArr
            console.log(this.arrList);
          }
        }
      }
    },3000)  

  }

  async onDelete(id:string){
    
    this.coreConectionService.delete('notifications/' + id)
  }

}
