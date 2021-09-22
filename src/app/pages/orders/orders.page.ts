import { CoreConectionService } from 'src/app/services/core-conection.service';
import { orderBy } from './../../interfaces/products';
import { UiComponentsService } from 'src/app/services/ui-components.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { itemOfOrder } from 'src/app/interfaces/products';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public defaultRef=`restaurant/table/${this.ActivatedRoute.snapshot.params.id}`
  public items : itemOfOrder[]
  public orderBy:orderBy 

  public totalCount:{
    totalPrice:number
    totalProducts:number
  }={
    totalPrice:0,
    totalProducts:0
  }

  constructor(
    private ActivatedRoute:ActivatedRoute,
    private LocalStorageService:LocalStorageService,
    private UiComponentsService:UiComponentsService,
    private CoreConectionService:CoreConectionService
    ) {  }
  
  async ngOnInit() {
    this.items = await this.LocalStorageService.get('orderHesperia')
    this.totalCount = this.total(this.items)
  }

  onDelete(index:number){
    this.items.splice(index,1)
    this.LocalStorageService.update('orderHesperia', this.items).then(()=>{
      this.totalCount= this.total(this.items)
      console.log(this.items);
    });
  }

  onActionSheet(){

  }

  async onSubmit(){
    let orderBy:orderBy = {
      listProduct:this.items,
      totalItems:this.totalCount.totalProducts,
      totalPrice:this.totalCount.totalPrice,
      idTable: parseInt(this.ActivatedRoute.snapshot.params.id),
      statusTable:'esperando'
    }
    await this.CoreConectionService.genericUpload('notifications',{comanda:orderBy})
    
    console.log(orderBy);
    // await this.LocalStorageService.remove('orderHesperia')
  }

  total(items:itemOfOrder[]){
    let total={
      totalPrice:0,
      totalProducts:0
    }
    items.forEach(e =>{
       total.totalPrice += e.product.price * e.cantProduct
       total.totalProducts += e.cantProduct
    });
    return total
  }

  async changeCant(item:itemOfOrder){
    
    let arrCant:any[] = []
    for (let index = 0; index < 10; index++) {
      arrCant.push({
        text: `${index+1}`,
        value: index+1
      })
    }
    
    (await this.UiComponentsService.showPicker({
      backdropDismiss: false,
      animated: true,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Seleccionar',
        handler: (val) => {
          item.cantProduct = val.cant.value;
          //buscar el objeto en el arreglo y actualizarlo en el local storage
          if (this.items.filter(element => element.product.id === item.product.id).length > 0) {
            this.LocalStorageService.update('orderHesperia', this.items);
            this.totalCount= this.total(this.items)
          }
        }
      }],
      columns: [
        {
          name: 'cant',
          prefix: 'Cantidad',
          options: arrCant
        }
      ],
      cssClass: 'picker-cant',
      mode: 'md',
    }))
  }


}
