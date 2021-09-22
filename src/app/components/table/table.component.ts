import { ModalController } from '@ionic/angular';
import { Category } from './../../interfaces/products';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlatesComponent } from './../plates/plates.component';
import { UiComponentsService } from './../../services/ui-components.service';
import { CoreConectionService } from 'src/app/services/core-conection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  public Categorys:Category[]
  public awaitRequest: boolean = false
  public timer$: any 

  constructor(
    private activatedRoute:ActivatedRoute,
    private coreConectionService:CoreConectionService,
    private uiComponentsService:UiComponentsService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private ModalController:ModalController
  ) { }

  async ngOnInit() {
    this.coreConectionService.findArray('categorys')
      .then(e=>{
        this.Categorys=e
      })
    await this.localStorageService.set('urlHesperia',{ urlHesperia:`http://192.168.0.102:1337`})
  }

  async onSelect(category:Category){
    await this.uiComponentsService.showModal({
      component:PlatesComponent,
      componentProps:{
        id:'category',
        Category:category,
        idTable: this.activatedRoute.snapshot.params.id
      }
    })
    
  }
  async requestInnkeeper(){
    this.coreConectionService.genericUpload('notifications',{
      statusTable: true,
      idTable: this.activatedRoute.snapshot.params.id
    }).then( async e=>{
      if(e != false){
        this.uiComponentsService.showToast("Un mesero ya viene en camino.")
        //success
      }
    })
    this.awaitRequest=true;

    (await this.requestTimer())
      .subscribe(e=>{
        if(e == 0){
          // alert | 
          this.awaitRequest=false
        }
      })
  }

  goToOrder(){
    this.router.navigateByUrl(`/orders/table/${this.activatedRoute.snapshot.params.id}`)
  }

  private async requestTimer(){
    //181,3 minutos
    return this.timer$ = timer(0, 1000).pipe(
      scan(acc => --acc, 60),// <-- sec
      takeWhile(x => x >= 0)
    );
  }

}
