import { Injectable } from '@angular/core';
import { ArchivoGateway } from '../../models/archivo/gateway/archivo-gateway';
import { Observable } from 'rxjs';
import { Itipocargue } from '../../models/archivo/itipocargue';
import { ICargue } from '../../models/archivo/icargue';
import { IArchivo } from '../../models/archivo/iarchivo';
import { ICambiarEstado } from '../../models/archivo/icambiar-estado';
import { IConsolidado } from '../../models/archivo/iconsolidado';
import { IDetallado } from '../../models/archivo/idetallado';
import { Iimpresionpdf } from '../../models/archivo/Iimpresionpdf';

@Injectable({
  providedIn: 'root',
})
export class GetArchivoUseCaseService {
  constructor(private _archivoGetway: ArchivoGateway) {}
  
  GetPfd(id: any, tipo: string): Observable<Iimpresionpdf[]> {
    return this._archivoGetway.GetPfd(id,tipo);
  }
  
  TipoCargue(): Observable<Itipocargue[]> {
    return this._archivoGetway.TipoCargue();
  }
  Listar(idOrganizacion: any): Observable<ICargue[]> {
    return this._archivoGetway.Listar(idOrganizacion);
  }
  CarguesXEstado(estado: string): Observable<ICargue[]> {
    return this._archivoGetway.CarguesXEstado(estado);
  } 
  Cargar(data: IArchivo): Observable<any> {
    return this._archivoGetway.Cargar(data);
  }
  LogCargue(idCargue): Observable<any> {
    return this._archivoGetway.LogCargue(idCargue);
  }
  CambiarEstadoCargue(data: ICambiarEstado): Observable<any> {
    return this._archivoGetway.CambiarEstadoCargue(data);
  }

  GetConsolidado(tipoArchivo: string, estado: string, entidad: string, fechaInicial: string,fechaFinal: string): Observable<IConsolidado[]>{
    return this._archivoGetway.GetConsolidado(tipoArchivo, estado, entidad, fechaInicial, fechaFinal);
  }

 GetConsolidadoXEntidad(tipoArchivo: string, estado: string, entidadId: string): Observable<IConsolidado[]>{
   return this._archivoGetway.GetConsolidadoXEntidad(tipoArchivo, estado, entidadId);
 }
 GetConsolidadoXFechaCargue(tipoArchivo: string, estado: string, fechaInicio: string, fechaFin: string): Observable<IConsolidado[]> {
  return this._archivoGetway.GetConsolidadoXFechaCargue(tipoArchivo, estado, fechaInicio, fechaFin);
 }
 GetDetallado(entidad: string, tipoArchivo: string, fechaInicial: string,fechaFinal: string): Observable<IDetallado[]>{
   return this._archivoGetway.GetDetallado(entidad, tipoArchivo,fechaInicial, fechaFinal);
 }

 GetDetalladoFilter(dataQuery): Observable<any>{
  return this._archivoGetway.GetDetalladoFilter(dataQuery);
  }
  GetConsolidadoFilter(dataQuery): Observable<any>{
    return this._archivoGetway.GetConsolidadoFilter(dataQuery);
  }
}
