import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Itipocargue} from '../../../domain/models/archivo/itipocargue';
import {ICargue} from '../../../domain/models/archivo/icargue';
import {IArchivo} from '../../../domain/models/archivo/iarchivo';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {toFormData} from '../../../domain/models/archivo/toFormData';
import {ICambiarEstado} from '../../../domain/models/archivo/icambiar-estado';
import { IConsolidado } from 'src/app/domain/models/archivo/iconsolidado';

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
  CambiarEstadoCargue(data: ICambiarEstado): Observable<any>{
    const url = `${environment.rest.endpoint}/Cargue/CambiarEstadoCargue/${data.idCargue}/${data.operacion}/${data.usuario}/${data.ip}`;
    return this.http.get<any>(url);
  }

  GetConsolidado(tipoArchivo: string, estado: string): Observable<IConsolidado[]>{
    const url = `${environment.rest.endpoint}/Cargue/GetConsolidado/${tipoArchivo}/${estado}`;
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
}
