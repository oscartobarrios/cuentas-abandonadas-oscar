import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IRequestLogin, IResponseLogin} from '../../../domain/models/login/ilogin';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  private _url: string = `${environment.rest.endpoint}/Users/authentication`;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };
  constructor(private http: HttpClient) {
    //super();
  }
  logIn(data: IRequestLogin): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${this._url}`, data , this._httpOptions);
  }

}
