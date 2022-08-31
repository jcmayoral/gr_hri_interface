import { Storage } from '@ionic/storage';
import { Injectable, OnInit, AfterViewInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class User {
    constructor(public storage: Storage){

    }
    async createDB(){
        console.log("create")
        // If using a custom driver:
        // await this.storage.defineDriver(MyCustomDriver)
        await this.storage.create();
    }

    login(username: string, uid: string): Promise<any> {
        console.log("login")
        this.createDB()
        return this.storage.set("is_loggedIn", true).then(() => {
            //his.setUsername(username); 
            //this.setUid(uid);
            return window.dispatchEvent(new CustomEvent('user:login'));
         }); 
        return null
    }
    async isLoggedIn(): Promise<boolean> {
        return this.storage.get("is_loggedIn").then((value) => {
          return value === true;
        });
    }
    

}
