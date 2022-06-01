import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  endpoint = 'http://localhost:8000/'
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
    await this.post("lock/", {"lock": true})
    //this.get("/users/me")
  }

  get(path: string){
    console.log("get "+ this.endpoint+path)
    return this.httpClient.get<any>(this.endpoint+path, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Error occured'))
      );
  }

  async post(path:string, msg){
    console.log("post "+ this.endpoint+path, msg)
    this.httpClient.post(this.endpoint+path, msg, this.httpOptions).subscribe((data) => {
       console.log(data)
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
