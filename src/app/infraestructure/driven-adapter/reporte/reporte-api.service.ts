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
  
    getReporteEstadoCargueExcel(estadocargue: any): Observable<Blob> {
      // const url = `${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel/${entidad}/${tipoarchivo}/${fechaCargue}/${nombre}/${estado}`;
      // return this.http.get<any>(url);
      // return this.http.post<Blob>(`${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel`, estadocargue,
      //   { responseType: 'blob' as 'json' });

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteEstadoCargueExcel/${estadocargue.entidad}/${estadocargue.tipoArchivo}/${estadocargue.fechaInicial}/${estadocargue.fechaFinal}/${estadocargue.nombre}/${estadocargue.estado}/${estadocargue.idCargue}`, 
            {responseType: 'blob'})
      .pipe(
        tap(data => console.log('Get mission report: ' + data)),
        catchError(this.handleError)
      )

    }

    getReporteCargueRechazadoExcel(estadocargue: any): Observable<Blob> {
    
      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteCargueRechazadoExcel/${estadocargue.entidad}/${estadocargue.tipoArchivo}/${estadocargue.fechaInicial}/${estadocargue.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
        tap(data => console.log('Get mission report: ' + data)),
        catchError(this.handleError)
      )

    }

    getReporteDetalladoExcel(filtros: any): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteDetalladoExcel/${filtros.entidad}/${filtros.tipoArchivo}/${filtros.fechaInicial}/${filtros.fechaFinal}/${filtros.estado}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }
    
    getReporteConsolidadoExcel(filtros: any): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteConsolidadoExcel/${filtros.entidad}/${filtros.tipoArchivo}/${filtros.fechaInicial}/${filtros.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }

    getReporteConsolidadoEntidadexcel(filtros: any): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteConsolidadoEntidadExcel/${filtros.entidad}/${filtros.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )

    }

    getReporteInterfazExcel(proceso: string): Observable<Blob> {

      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteInterfazExcel/${proceso}`, 
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

    GetCargueRechazadoFilter(dataQuery): Observable<any>{
      const url = `${environment.rest.endpoint}/Reporte/GetCargueRechazadoFilter`;
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

    getReporteCertificacionSaldos(entidad: string,fecha: string): Observable<any> {

      const url = `${environment.rest.endpoint}/Reporte/GetCertificacionSaldos/${entidad}/${fecha}`;
      return this.http.get<any>(url);

    }

    GetConsolidadoEntidadFilter(dataQuery): Observable<any>{
      const url = `${environment.rest.endpoint}/Reporte/GetCOnsolidadoEntidadFilter`;
      return this.http.post<any>(url, dataQuery);
    }

    GetAdjudicacionSubastaFilter(dataQuery): Observable<any>{
      const url = `${environment.rest.endpoint}/Reporte/GetAdjudicacionSubastaFilter`;
      return this.http.post<any>(url, dataQuery);
    }
    
    GetAdjudicacionSubastaExcel(filtros:any): Observable<any>{
      return this.http.get(`${environment.rest.endpoint}/Reporte/GetReporteAdjudicacionSubastaExcel/${filtros.tipoSubasta}/${filtros.fechaInicial}/${filtros.fechaFinal}`, 
            {responseType: 'blob'})
      .pipe(
              tap(data => console.log('Get mission report: ' + data)),
              catchError(this.handleError)
      )
    }

  }
