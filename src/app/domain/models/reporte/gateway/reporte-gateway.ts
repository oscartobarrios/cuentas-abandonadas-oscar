import {Observable} from 'rxjs';
import { IEstadoCargue } from '../iestadocargue';

export abstract class ReporteGateway {
  abstract getReporteEstadoCargueExcel(estadocargue: IEstadoCargue): Observable<any>;
  abstract getReporteDetalladoExcel(filtros: any): Observable<any>;
  abstract GetEstadoCargueFilter(dataQuery): Observable<any>;

  abstract getReporteConsolidadoExcel(filtros: any): Observable<any>;
}