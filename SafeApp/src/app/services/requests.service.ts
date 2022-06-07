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
  //endpoint = 'http://grassrobotics.sytes.net/'
  endpoint = "https://jselkj.deta.dev/"
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
    await this.post3("lock/", {"lock": true})
    //this.get("/users/me")
  }

  get(path: string){
    console.log("get "+ this.endpoint+path)
    return this.httpClient.get<any>(this.endpoint+path, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Error occured'))
      );
  }

  async post2(route:string, msg:any){
    const rawResponse = await fetch(this.endpoint+route, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({lock: 1})
    }).catch(function(error){
      alert(error)
    });
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
