import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { EntidadFinanciera } from 'src/app/domain/models/entidad-financiera/entidad-financiera';

@Injectable({
  providedIn: 'root'
})
export class EntidadApiService {

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

  ListadoEntidades(): Observable<EntidadFinanciera[]> {
    const url = `${environment.rest.endpoint}/Entidad/GetFichasEntidad`;
    return this.http.get<EntidadFinanciera[]>(url);
  }
}
