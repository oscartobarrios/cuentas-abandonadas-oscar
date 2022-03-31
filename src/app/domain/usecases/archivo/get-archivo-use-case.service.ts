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
import { ICambiarEstadoRechazada } from '../../models/archivo/icambiar-estado-reachazada';

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
  LogCargueDescarga(idCargue): Observable<any> {
    return this._archivoGetway.LogCargueDescarga(idCargue);
  }

  CambiarEstadoCargue(data: ICambiarEstado): Observable<any> {
    return this._archivoGetway.CambiarEstadoCargue(data);
  }

  ActualizarVbno(idCargue: string, tipoUsuario: string): Observable<any> {
    return this._archivoGetway.ActualizarVbno(idCargue,tipoUsuario);
  }

  ActualizarVbnoOrden(idCargue: string, tipoUsuario: string,idUsuario: string): Observable<any> {
    return this._archivoGetway.ActualizarVbnoOrden(idCargue,tipoUsuario,idUsuario);
  }

  ActualizarVbnoOrdenTodos(idUsuario: string): Observable<any> {
    return this._archivoGetway.ActualizarVbnoOrdenTodos(idUsuario);
  }

  CambiarEstadoCargueRechazada(data: ICambiarEstadoRechazada): Observable<any> {
    return this._archivoGetway.CambiarEstadoCargueRechazada(data);
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

 //Filtros y paginado
 GetDetalladoFilter(dataQuery): Observable<any>{
  return this._archivoGetway.GetDetalladoFilter(dataQuery);
  }
  GetConsolidadoFilter(dataQuery): Observable<any>{
    return this._archivoGetway.GetConsolidadoFilter(dataQuery);
  }

  GetObtenerOrdenCumplimientoIdCargue(idCargue: string): Observable<any>{
    return this._archivoGetway.GetObtenerOrdenCumplimientoIdCargue(idCargue);
  }
 GetCargueFilter(dataQuery): Observable<any>{
  return this._archivoGetway.GetCargueFilter(dataQuery);
 }
}
