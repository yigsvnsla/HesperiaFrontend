import { UiComponentsService } from 'src/app/services/ui-components.service';
import { LocalStorageService } from "../services/local-storage.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError as observableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
const { Device } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class CoreConectionService {

  constructor(
    private localStorageService:LocalStorageService,
    private httpClient:HttpClient,
    private router: Router,
    private uiComponentsService:UiComponentsService
  ) { 

  }

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }



  async getNotification(){
    
    return await  this.findArray('notifications')

  }


  async getTables(){
    return new Promise(async (value,reject)=>{
      this.httpClient
        //.get((await this.localStorageService.get("urlHesperia")).urlHesperia + `/restaurants`)
        .get("/api/restaurants")
        .pipe(catchError(this.errorHandler))
        .subscribe(async (res)=>{
          console.log(res)
          value(res)
        },async (err)=>{
          reject(err)
        });
       
    })
  }

  async findArray(table: string, query?: string): Promise<any[]> {
     return new Promise(async (value) => {
       this.httpClient
        //  .get<any[]>((await this.localStorageService.get("urlHesperia")).urlHesperia+`/${table}${query?"/"+query:""}`)
        .get<any[]>(`/api/${table}${query?"/"+query:""}`)
        .subscribe(
          async (res:any) => {
            value(res);
          },
          async (fail) => {
          console.error("findArray: ", fail);
             value(null);
          }
         );
     });
   }

   async genericUpload(table: string, body: any,id?:string):Promise<any>{
    return new Promise(async (value) => {
      this.httpClient
        .post<any>(`/api/${table}/`,body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .subscribe(
          (res) => {
            value(res);
          },
          (fail) => {
            value(false);
          }
        )
        ;
    });
  }

  async delete(table: string, param?: string): Promise<boolean> {
    return new Promise(async (value) => {
      this.httpClient.delete('/api/'+ table + `${param ? param : ""}`)
      .subscribe(
        (res) => {
          value(true);
        },
        (fail) => {
          value(false);
        }
      );
    });
  }

}
