import {Observable} from 'rxjs';
import { IEstadoCargue } from '../iestadocargue';

export abstract class ReporteGateway {
  abstract getReporteEstadoCargueExcel(estadocargue: IEstadoCargue): Observable<any>;
}