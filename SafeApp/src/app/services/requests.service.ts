import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Http} from '@capacitor-community/http'

@Injectable({
  providedIn: 'root'
})


export class RequestsService {
  //endpoint = 'http://192.168.1.67:8000/'
  //endpoint = 'http://201.137.167.207/'
  endpoint = 'http://grassrobotics.sytes.net/'

  //endpoint = "https://jselkj.deta.dev/"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                                //'Access-Control-Allow-Origin': '*',
                                //'Access-Control-Request-Headers': 'Content-Type',
                                //'accept':'application/json'
                                //'Connection' : 'keep-alive'
                                //'apikey': 'wq16ai0ymsj6nxaw0ujr2b6gu75h2nzo'})
                              })
  };
  constructor(private httpClient: HttpClient)  { }

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
    console.log("get "+ this.endpoint+route)

    const rawResponse = await Http.get({
      url: this.endpoint+route,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic am9zZToxMjM0' //+ 'jose:1234'
      },
      //data: JSON.stringify({lock: 1})
    })
    return rawResponse
  }

  async post2(route:string, msg:any){
    const rawResponse = await fetch(this.endpoint+route, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Authorization': "Basic am9zZToxMjM0"//jose:1234'
        
      },
      body: JSON.stringify({lock: 1})
    }).catch(function(error){
      alert(error)
    });
    //const content = await rawResponse.json();
    //console.log(content);

  }

  async post3(route:string, msg:any){
    console.log("post 3")
    const rawResponse = await Http.post({
      url: this.endpoint+route,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

  async post(route:string, msg){
    console.log("post "+ this.endpoint+route, msg)
    this.httpClient.post(this.endpoint+route, msg, this.httpOptions).subscribe((res : any) => {
       console.log(res.specials)
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

}
