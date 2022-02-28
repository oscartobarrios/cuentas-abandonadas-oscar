import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Itipocargue} from '../../../domain/models/archivo/itipocargue';
import {ICargue} from '../../../domain/models/archivo/icargue';
import {IArchivo} from '../../../domain/models/archivo/iarchivo';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {toFormData} from '../../../domain/models/archivo/toFormData';
import {ICambiarEstado} from '../../../domain/models/archivo/icambiar-estado';
import { IConsolidado } from 'src/app/domain/models/archivo/iconsolidado';
import { IDetallado } from 'src/app/domain/models/archivo/idetallado';
import { Iimpresionpdf } from 'src/app/domain/models/archivo/Iimpresionpdf';
import { catchError, tap } from 'rxjs/operators';
import { ICambiarEstadoRechazada } from 'src/app/domain/models/archivo/icambiar-estado-reachazada';

@Injectable({
  providedIn: 'root'
})
export class ArchivoApiService {

  private _httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Disposition': 'multipart/form-data'
      },
    )
  };

  constructor(private http: HttpClient) {
  }

  GetPfd(id: any, tipo: string): Observable<Iimpresionpdf[]> {
    const url = `${environment.rest.endpoint}/Reporte/OrdenCumplimiento/${id}/${tipo}`;
    return this.http.get<Iimpresionpdf[]>(url);
  }
  
  TipoCargue(): Observable<Itipocargue[]> {
    const url = `${environment.rest.endpoint}/Cargue/GetTipoCargues`;
    return this.http.get<Itipocargue[]>(url);
  }

  Listar(idOrganizacion: any): Observable<ICargue[]> {
    const url = `${environment.rest.endpoint}/Cargue/GetCarguesByIdOrganizacion/${idOrganizacion}`;
    return this.http.get<ICargue[]>(url);
  }

  CarguesXEstado(estado: string): Observable<ICargue[]> {
    const url = `${environment.rest.endpoint}/Cargue/GetCarguesXEstado/${estado}`;
    return this.http.get<ICargue[]>(url);
  } 

  Cargar(data: IArchivo): Observable<any> {
    const url = `${environment.rest.endpoint}/Cargue/CargarArchivoEntidad?tipoArchivo=${data.tipoArchivo}&nombreCargue=${data.nombreCargue}&usuario=${data.usuario}`;
    const archivo: FormData = new FormData();
    archivo.append('file', data.file, data.file.name);
    return this.http.post<any>(url, archivo);
  }
  LogCargue(idCargue): Observable<any> {
    const url = `${environment.rest.endpoint}/Cargue/getLogErroresCargue/${idCargue}`;
    return this.http.get<Itipocargue>(url);
  }

  LogCargueDescarga(idCargue): Observable<any> {

    return this.http.get(`${environment.rest.endpoint}/Cargue/getLogErroresCargueDescarga/${idCargue}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  CambiarEstadoCargue(data: ICambiarEstado): Observable<any>{
    const url = `${environment.rest.endpoint}/Cargue/CambiarEstadoCargue/${data.idCargue}/${data.operacion}/${data.usuario}/${data.ip}`;
    return this.http.get<any>(url);
  }

  CambiarEstadoCargueRechazada(data: ICambiarEstadoRechazada): Observable<any>{
    const url = `${environment.rest.endpoint}/Cargue/CambiarEstadoCargueRechazada?idCargue=${data.idCargue}&usuario=${data.usuario}&ip=${data.ip}&observacion=${data.observacion}`;
    const archivo: FormData = new FormData();
    archivo.append('file', data.file, data.file.name);
    return this.http.post<any>(url, archivo);
  }

  GetConsolidado(tipoArchivo: string, estado: string, entidad: string,fechaInicial: string,fechaFinal: string): Observable<IConsolidado[]>{
    const url = `${environment.rest.endpoint}/Cargue/GetConsolidado/${tipoArchivo}/${estado}/${entidad}/${fechaInicial}/${fechaFinal}`;
    return this.http.get<IConsolidado[]>(url);
  }

  GetConsolidadoXEntidad(tipoArchivo: string, estado: string, entidadId: string): Observable<IConsolidado[]>{
    const url = `${environment.rest.endpoint}/Cargue/GetConsolidado/${tipoArchivo}/${estado}/${entidadId}`;
    return this.http.get<IConsolidado[]>(url);
  }
  GetConsolidadoXFechaCargue(tipoArchivo: string, estado: string, fechaInicio: string, fechaFin: string): Observable<IConsolidado[]> {
    const url = `${environment.rest.endpoint}/Cargue/GetConsolidado/${tipoArchivo}/${estado}/${fechaInicio}/${fechaFin}`;
    return this.http.get<IConsolidado[]>(url);
  }
  GetDetallado(entidad: string, tipoArchivo: string, fechaInicial: string,fechaFinal: string): Observable<IDetallado[]>{
    const url = `${environment.rest.endpoint}/Cargue/GetDetallado/${entidad}/${tipoArchivo}/${fechaInicial}/${fechaFinal}`;
    return this.http.get<IDetallado[]>(url);
  }
  GetDetalladoFilter(dataQuery): Observable<any>{
    const url = `${environment.rest.endpoint}/Cargue/GetDetalladoFilter`;
    return this.http.post<any>(url, dataQuery);
  }

  GetConsolidadoFilter(dataQuery): Observable<any>{
    const url = `${environment.rest.endpoint}/Cargue/GetConsolidadoFilter`;
    return this.http.post<any>(url, dataQuery);
  }

}
