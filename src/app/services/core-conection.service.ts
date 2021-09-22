import { order } from './../interfaces/products';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, throwError as observableThrowError, timer } from "rxjs";
import { catchError, retry, share, switchMap, takeUntil } from "rxjs/operators";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CoreConectionService {

  private subjet = new Subject();

  constructor(
    private httpClient:HttpClient,
  ) { 

  }

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }

  stop(){
    this.subjet.next();
  }
  refreshDataClick() {
    this.subjet.next('');
  }

  getNotification(){
    return timer(1,3000)
    .pipe(
      switchMap( ()=> 
      this.httpClient.get<order[]>('api/notifications')
      .pipe(catchError(this.errorHandler))
      ),
      
      retry(),
      share(),
      takeUntil(this.subjet)
    )
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

  genericUpdate(table: string, body:any, param: string ){
    return new Promise(async (value)=>{
      this.httpClient.put(`/api/${table}/${param ? param : ""}`,body)
        .pipe(catchError(this.errorHandler))
        .subscribe(
          (res)=>{
            value(res)
          },
          (res)=>{
            value(res)
          }
        )
    })
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
