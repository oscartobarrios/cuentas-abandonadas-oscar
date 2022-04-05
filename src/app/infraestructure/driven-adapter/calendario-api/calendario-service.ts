import { InterfazContableList } from '../../../domain/models/interfaz-contable/interfaz-contable-list';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Itipocargue} from '../../../domain/models/archivo/itipocargue';
import {ICargue} from '../../../domain/models/archivo/icargue';
import {IArchivo} from '../../../domain/models/archivo/iarchivo';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {toFormData} from '../../../domain/models/archivo/toFormData';
import {ICambiarEstado} from '../../../domain/models/archivo/icambiar-estado';
import { InterfazContable } from 'src/app/domain/models/interfaz-contable/interfaz-contable';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private _url: string = `${environment.rest.endpoint}/Calendario`;
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

  ListarCalendarios(): Observable<ICalendario[]> {
    return this.http.get<ICalendario[]>(`${this._url}/GetCalendarios`);
  }

  GenerarCalendario(data: ICalendario): Observable<any> {
    return this.http.post<any>(`${this._url}/GenCalendario`, data , this._httpOptions);
  }

}
