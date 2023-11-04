import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntidadGateway } from '../../models/entidad-financiera/gateway/entidad-gateway';
import { EntidadFinanciera } from './../../models/entidad-financiera/entidad-financiera';


@Injectable({
  providedIn: 'root',
})
export class GetEntidadUseCaseService {
  constructor(private _entidadGateway: EntidadGateway) {}

  ListadoEntidades(): Observable<EntidadFinanciera[]>{
    return this._entidadGateway.ListadoEntidades();
  }
}
