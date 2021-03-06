import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {  }

    //  To set an item, use set(key, value):
  public async set(key:string,value:{}|[]) {
    if (await this.get(key) == null) {
      await Storage.set( { key,  value:JSON.stringify(value) });
    }else { 
      // exist
    }
  }
    //To get the item back, use get(name):
  public async get(key: string):Promise<any>{
    return JSON.parse((await Storage.get({ key: key })).value);
  }
    // to update element insert
  public async update(key:string,value:{}){
    if (await this.get(key) != null) {
      await Storage.set({ key,  value:JSON.stringify(value) });
    }// else { this element not exist }
  }
    //To remove an item:
  public async remove(key: string) {
    await Storage.remove({key:key});
  }
     //To clear all items:
  public async clear() {
    await Storage.clear();
  }
     //To get all keys stored:
  public async getKeys() {
    return await Storage.keys()
  }
}

