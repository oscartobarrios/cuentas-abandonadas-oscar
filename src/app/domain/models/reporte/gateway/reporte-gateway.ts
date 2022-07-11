import {Observable} from 'rxjs';
import { IEstadoCargue } from '../iestadocargue';

export abstract class ReporteGateway {
  abstract getReporteEstadoCargueExcel(estadocargue: any): Observable<any>;
  abstract getReporteCargueRechazadoExcel(estadocargue: any): Observable<any>;
  abstract getReporteConsolidadoEntidadexcel(estadocargue: any): Observable<any>;
  abstract getReporteDetalladoExcel(filtros: any): Observable<any>;
  abstract GetEstadoCargueFilter(dataQuery): Observable<any>;
  abstract GetCargueRechazadoFilter(dataQuery): Observable<any>;
  abstract getReporteConsolidadoExcel(filtros: any): Observable<any>;
  abstract getReporteInterfazExcel(proceso: string): Observable<any>;
  abstract getReporteCertificacionSaldos(entidad: string,fecha: string): Observable<any>;
  abstract GetConsolidadoEntidadFilter(dataQuery): Observable<any>;
}