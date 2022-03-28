import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuncionarioModelo } from '../../models/administrativo/funcionario';
import { AdministrativoGateway } from '../../models/administrativo/gateway/administrativo-gateway';
import { ICargo } from '../../models/administrativo/icargo';
import { IFuncionario } from '../../models/administrativo/iFuncionario';
import { IUsuario } from '../../models/administrativo/iusuario';
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

    ListarUsuarios(): Observable<IUsuario[]> {
      return this._administrativoGetway.ListarUsuarios();
    }

    ListarFuncionarios(): Observable<IFuncionario[]> {
      return this._administrativoGetway.ListarFuncionarios();
    }

    insertarFuncionario(Ifuncionario:FuncionarioModelo): Observable<any> {
      return this._administrativoGetway.insertarFuncionario(Ifuncionario);
    }

  consultarFuncionario(idFuncionario: number): Observable<any> {
    return this._administrativoGetway.consultarFuncionario(idFuncionario);
  }

}