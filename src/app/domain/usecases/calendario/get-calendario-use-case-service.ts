import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarioGateway } from '../../models/calendario/gateway/calendario-gateway';
import { ICalendario } from '../../models/calendario/calendario';

@Injectable({
  providedIn: 'root',
})
export class GetCalendarioUseCaseService {
  constructor(private _calendarioGateway: CalendarioGateway) {}

  ListarCalendarios(): Observable<ICalendario[]> {
      return this._calendarioGateway.ListarCalendarios();
  }
  GenerarCalendario(data: ICalendario): Observable<any> {
    console.log(data);

      return this._calendarioGateway.GenerarCalendario(data);
  }

  GetCalendario(id, fechaDesde): Observable<ICalendario> {
    return this._calendarioGateway.GetCalendario(id, fechaDesde);
  }

  EditarCalendario(data: ICalendario): Observable<any> {
    console.log(data);

      return this._calendarioGateway.EditarCalendario(data);
  }

}
