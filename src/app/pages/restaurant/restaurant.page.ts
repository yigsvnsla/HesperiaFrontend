import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from "@ionic/angular";
import { ModalViewOrderComponent } from './../../components/modal-view-order/modal-view-order.component';
import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { order } from './../../interfaces/products';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {


  public arrList: any[] = []
  public Tables: infoTable[] = []
  public view: boolean = this.platform.is('mobile')
  public segment: string = 'Mesas'

  constructor(
    private router: Router,
    private platform: Platform,
    private coreConectionService: CoreConectionService,
    private uiComponentsService: UiComponentsService
  ) {

  }

  async ngOnInit() {
    this.arrList = await this.coreConectionService.findArray('notifications')

    for (let index = 0; index < 15; index++) {
      let table: infoTable = {
        id: index + 1,
        name: 'Mesa'
      };
      this.Tables.push(table)
    }
  }

  statusFilterColor(state:string) {  
    switch (state ) {
      case 'esperando':
        return 'warning'
      case 'confirmando':
        return 'primary'
      case 'enviado':
        return 'success'
      default:
        break;
    }
  }

  goTable(id: number) {
    this.router.navigateByUrl('restaurant/table/' + id)
  }


  public get getDevice(): boolean {
    console.log(this.platform.is('mobile'));

    return this.platform.is('mobile')
  }


  async segmentChanged(e) {
    this.segment = e.detail.value
  }

  ionViewWillEnter() {
    /////////////////////////////////////////////////////
    this.coreConectionService.getNotification()
      .subscribe(data => {
        if (JSON.stringify(data) !== JSON.stringify(this.arrList)) {
          for (let i of data) {
            if (!this.arrList.some(val => val.comanda.idTable === i.comanda.idTable)) {
              this.arrList.push(i)
            }
          }
        }
      })
    /////////////////////////////////////////////////////
  }
  async onDelete(id: number, index: number) {
    await this.coreConectionService.delete(`notifications/${id}`)
    this.arrList.splice(index)
  }

  viewInfo(order: order) {
    this.uiComponentsService.showModal({
      component: ModalViewOrderComponent,
      cssClass: 'my-custom-class-viewInfo',
      componentProps: {
        Order: order
      }
    })
  }
}

interface infoTable {
  id: number,
  name: string
}