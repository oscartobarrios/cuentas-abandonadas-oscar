import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubastaGateway } from "../../models/subasta/gateway/subasta-gateway";

@Injectable({
    providedIn: 'root',
  })
  export class GetSubastaService {

    constructor(private _subastaGetway: SubastaGateway) {}

    generarvalorsubasta(IValor:any): Observable<any> {
        return this._subastaGetway.generarvalorsubasta(IValor);
    }


  }