import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubastaGateway } from "../../models/subasta/gateway/subasta-gateway";

@Injectable({
    providedIn: 'root',
  })
  export class GetSubastaService {
    showPreloader() {
      throw new Error('Method not implemented.');
    }

    constructor(private _subastaGetway: SubastaGateway) {}

    generarvalorsubasta(IValor:any): Observable<any> {
        return this._subastaGetway.generarvalorsubasta(IValor);
    }

    ListarSubastas(): Observable<any[]> {
      return this._subastaGetway.ListarSubastas();
    }

    InsertarActualizarAdjudicacion(IValor:any): Observable<any> {
      return this._subastaGetway.InsertarActualizarAdjudicacion(IValor);
    }

    ListarAdjudicacionesIdValor(idValor:number): Observable<any[]> {
      return this._subastaGetway.ListarAdjudicacionesIdValor(idValor);
    }

    ListarAdjudicacionesIdAdjudicacion(idAdjudicacion:number): Observable<any> {
      return this._subastaGetway.ListarAdjudicacionesIdAdjudicacion(idAdjudicacion);
    }

  }