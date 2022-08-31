import { Storage } from '@ionic/storage';

export class User {
    constructor(public storage: Storage){

    }

    login(username: string, uid: string): Promise<any> {
        console.log("login")
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
