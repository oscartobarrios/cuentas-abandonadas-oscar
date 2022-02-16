import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteGateway } from '../../models/reporte/gateway/reporte-gateway';
import { IEstadoCargue } from '../../models/reporte/iestadocargue';

@Injectable({
    providedIn: 'root',
  })
  export class GetReporteService {

    constructor(private _reporteGetway: ReporteGateway) {}

    getReporteEstadoCargaexcel(estadocargue: IEstadoCargue): Observable<any> {
        return this._reporteGetway.getReporteEstadoCargueExcel(estadocargue);
      }

    getReporteDetalladoExcel(filtros: any): Observable<any> {
      return this._reporteGetway.getReporteDetalladoExcel(filtros);
    }

    getReporteConsolidadoExcel(filtros: any): Observable<any> {
      return this._reporteGetway.getReporteConsolidadoExcel(filtros);
    }
}