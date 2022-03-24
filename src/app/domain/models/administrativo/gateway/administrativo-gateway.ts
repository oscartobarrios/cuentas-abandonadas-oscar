import {Observable} from 'rxjs';
import { ICargo } from '../icargo';

export abstract class AdministrativoGateway {
  abstract insertarCargo(ICargo: ICargo): Observable<any>;
  abstract ListarCargos(): Observable<ICargo[]>;
  abstract consultarCargo(idCargo:number): Observable<ICargo>;
}