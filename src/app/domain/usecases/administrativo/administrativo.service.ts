import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministrativoGateway } from '../../models/administrativo/gateway/administrativo-gateway';
import { ICargo } from '../../models/administrativo/icargo';
import { ReporteGateway } from '../../models/reporte/gateway/reporte-gateway';

@Injectable({
    providedIn: 'root',
  })
  export class GetAdministrativoService {

    constructor(private _administrativoGetway: AdministrativoGateway) {}

    insertarCargo(Icargo:ICargo): Observable<any> {
        return this._administrativoGetway.insertarCargo(Icargo);
    }

    ListarCargos(): Observable<ICargo[]> {
      return this._administrativoGetway.ListarCargos();
    }

    consultarCargo(idCargo: number): Observable<ICargo> {
      return this._administrativoGetway.consultarCargo(idCargo);
    }

}