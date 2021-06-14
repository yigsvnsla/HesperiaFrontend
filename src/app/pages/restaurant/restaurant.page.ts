import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  public Tables:infoTable[]=[]

  constructor(
    private router:Router
    
  ) { 
    
  }

   ngOnInit() {
        for (let index = 0; index < 15; index++) {
          let table:infoTable={
            id:index + 1 ,
            name:'Mesa'
          };
          this.Tables.push(table)
        }
  }

  goTable(id:number){
    this.router.navigateByUrl('restaurant/table/'+id)
  }

}

interface infoTable{
  id:number,
  name:string
}