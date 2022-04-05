import { InterfazContableList } from './../interfaz-contable-list';
import { InterfazContable } from './../interfaz-contable';
import {Observable} from 'rxjs';

export abstract class InterfazContableGateway {
  abstract ListarInterfazContable(): Observable<InterfazContableList[]>;
  abstract CrearInterfazContable(data: InterfazContable): Observable<any>;
  abstract TrasmitirInterfazContable(data: InterfazContableList): Observable<boolean>;
}
