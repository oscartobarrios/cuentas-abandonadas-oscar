import { EntidadFinanciera } from './../entidad-financiera';
import {Observable} from 'rxjs';

export abstract class EntidadGateway {
  abstract ListadoEntidades(): Observable<EntidadFinanciera[]>;
}
