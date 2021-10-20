import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
      },
    )
  };
  constructor(private http: HttpClient) { }
  public getIP(): any
  {
    return this.http.get('https://api.ipify.org/?format=json', this._httpOptions);
  }

}
