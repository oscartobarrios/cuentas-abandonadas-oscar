import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IEstadoCargue } from "src/app/domain/models/reporte/iestadocargue";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ReporteApiService {

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
  
    getReporteEstadoCargueExcel(estadocargue: IEstadoCargue): Observable<Blob> {
      // const url = `${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel/${entidad}/${tipoarchivo}/${fechaCargue}/${nombre}/${estado}`;
      // return this.http.get<any>(url);
      // return this.http.post<Blob>(`${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel`, estadocargue,
      //   { responseType: 'blob' as 'json' });

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel/${estadocargue.entidad}/${estadocargue.tipoArchivo}/${estadocargue.fechaCargue}/${estadocargue.nombre}/${estadocargue.estado}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }

    getReporteDetalladoExcel(filtros: any): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteDetalladoExcel/${filtros.entidad}/${filtros.tipoArchivo}/${filtros.fechaInicial}/${filtros.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }

    GetEstadoCargueFilter(dataQuery): Observable<any>{
      const url = `${environment.rest.endpoint}/Reporte/GetEstadoCargueFilter`;
      return this.http.post<any>(url, dataQuery);
    }

    getReporteConsolidadoExcel(filtros: any): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteConsolidadoExcel/${filtros.entidad}/${filtros.tipoArchivo}/${filtros.fechaInicial}/${filtros.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }

    GetEstadoCargueFilter(dataQuery): Observable<any>{
      const url = `${environment.rest.endpoint}/Reporte/GetEstadoCargueFilter`;
      return this.http.post<any>(url, dataQuery);
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
  
  }
