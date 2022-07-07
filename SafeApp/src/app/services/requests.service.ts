import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Http} from '@capacitor-community/http'

@Injectable({
  providedIn: 'root'
})


export class RequestsService {
  endpoint = 'http://grassrobotics.sytes.net:8000/'
  //endpoint = 'http://http://201.137.141.171:8000/'
  //endpoint = 'http://localhost:8000/'

  //thisendpoint = "https://jselkj.deta.dev/"
  /*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache',
                                'Access-Control-Allow-Origin': '*',
                                //'Access-Control-Request-Headers': 'Content-Type',
                                //'accept':'application/json'
                                //'Connection' : 'keep-alive'
                                //'apikey': 'wq16ai0ymsj6nxaw0ujr2b6gu75h2nzo'})
                              })
  };
  */
  constructor()  { }

  async lock(){
    return await this.post3("lock/", {"lock": true})
    //this.get("/users/me")
  }

  async publish_speed(x,z){
    console.log(x,z)
    return await this.post3("speed/", {"vel_x": x, "vel_y": 0.2, "vel_z": z})
    //this.get("/users/me")
  }

  async get(route: string){
    console.log("get from "+ this.endpoint+route)
    const rawResponse = await Http.get({
      url: this.endpoint+route,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': "true",
        'Access-Control-Request-Headers': 'Content-Type',
        'accept':'application/json',
        'Connection' : 'keep-alive',
        'Content-Type': 'application/json',
        'Authorization': 'Basic am9zZToxMjM0' //+ 'jose:1234'
      },
      //data: JSON.stringify({lock: 1})
    })
    return rawResponse
  }

  async post3(route:string, msg:any){
    console.log("post function")
    const rawResponse = await Http.post({
      url: this.endpoint+route,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic am9zZToxMjM0' //+ 'jose:1234'
      },
      data: JSON.stringify(msg)
    }).catch(function(error){
      alert(error)
    });
    return await rawResponse
    //const content = await rawResponse.json();
    //console.log(content);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

}
