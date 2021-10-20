import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from './../../../../environments/environment';

const PREFIX_STORAGE: string = 'ICETEX-';
const TYPE_STORAGE: string = 'session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  token: string;
  private subject = new Subject<{ key: string, value: any }>();
  
  public getToken = () => this.token;
  
  public watchStorage(): Subject<{ key: string, value: any }> {
    return this.subject;
  }

  public setItem(key: string, value: any, typeStorage?: string, prefixStorage?: string) {
    let data = JSON.stringify(value);
    typeStorage = typeStorage || TYPE_STORAGE;
    prefixStorage = prefixStorage || PREFIX_STORAGE;
    if (typeStorage === 'local') localStorage.setItem(prefixStorage + key.toUpperCase(), data);
    if (typeStorage === 'session') sessionStorage.setItem(prefixStorage + key.toUpperCase(), data);
    this.subject.next({ key: key.toUpperCase(), value: value });
  }

  public getItem(key: string, typeStorage?: string, prefixStorage?: string) {
    let item;
    typeStorage = typeStorage || TYPE_STORAGE;
    prefixStorage = prefixStorage || PREFIX_STORAGE;
    if (typeStorage === 'local') item = localStorage.getItem(prefixStorage + key.toUpperCase());    
    if (typeStorage === 'session') item = sessionStorage.getItem(prefixStorage + key.toUpperCase());
    return JSON.parse(item);
  }
 
  public getKeys(typeStorage?: string, prefixStorage?: string) {
    typeStorage = typeStorage || TYPE_STORAGE;
    if (typeStorage === 'local') return Object.keys(localStorage);
    if (typeStorage === 'session') return Object.keys(sessionStorage);
  }

  public remove(key: string, typeStorage?: string, prefixStorage?: string) {
    typeStorage = typeStorage || TYPE_STORAGE;
    prefixStorage = prefixStorage || PREFIX_STORAGE;
    if (typeStorage === 'local') localStorage.removeItem(prefixStorage + key.toUpperCase());
    if (typeStorage === 'session') sessionStorage.removeItem(prefixStorage + key.toUpperCase());
    this.subject.next({ key: key.toUpperCase(), value: null });
  }

  public clear(typeStorage?: string) {
    typeStorage = typeStorage || TYPE_STORAGE;
    if (typeStorage === 'local') localStorage.clear();
    if (typeStorage === 'session') sessionStorage.clear();
    this.subject.next({ key: null, value: null });
  }

}
