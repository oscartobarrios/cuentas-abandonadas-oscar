import { InterfazContableList } from './../../models/interfaz-contable/interfaz-contable-list';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfazContableGateway } from '../../models/interfaz-contable/gateway/interfaz-contable-gateway';
import { InterfazContable } from '../../models/interfaz-contable/interfaz-contable';

@Injectable({
  providedIn: 'root',
})
export class GetInterfazContableUseCaseService {
  constructor(private _interfazContableGateway: InterfazContableGateway) {}

  ListarInterfazContable(): Observable<InterfazContableList[]> {
      return this._interfazContableGateway.ListarInterfazContable();
  }
  CrearInterfazContable(data: InterfazContable): Observable<any> {
      return this._interfazContableGateway.CrearInterfazContable(data);
  }
}
