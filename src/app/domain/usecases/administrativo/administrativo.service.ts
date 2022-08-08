import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuncionarioModelo } from '../../models/administrativo/funcionario';
import { AdministrativoGateway } from '../../models/administrativo/gateway/administrativo-gateway';
import { ICargo } from '../../models/administrativo/icargo';
import { IEntidad } from '../../models/administrativo/ientidad';
import { IFuncionario } from '../../models/administrativo/iFuncionario';
import { IUsuario } from '../../models/administrativo/iusuario';
import { EntidadFinanciera } from '../../models/entidad-financiera/entidad-financiera';
import { IRequestLogin } from '../../models/login/ilogin';
import { ReporteGateway } from '../../models/reporte/gateway/reporte-gateway';

@Injectable({
    providedIn: 'root',
  })
  export class GetAdministrativoService {

    constructor(private _administrativoGetway: AdministrativoGateway) {}

    insertarCargo(Icargo:ICargo): Observable<any> {
        return this._administrativoGetway.insertarCargo(Icargo);
    }

    insertarEntidad(Ientidad:EntidadFinanciera): Observable<any> {
      return this._administrativoGetway.insertarEntidad(Ientidad);
    }

    actualizarEntidad(Ientidad:EntidadFinanciera): Observable<any> {
      return this._administrativoGetway.actualizarEntidad(Ientidad);
    }

    ListarCargos(): Observable<ICargo[]> {
      return this._administrativoGetway.ListarCargos();
    }

    consultarCargo(idCargo: number): Observable<ICargo> {
      return this._administrativoGetway.consultarCargo(idCargo);
    }

    consultarEntidad(idEntidad: number): Observable<IEntidad> {
      return this._administrativoGetway.consultarEntidad(idEntidad);
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

  consultarUsuario(idUsuario: number): Observable<any> {
    return this._administrativoGetway.consultarUsuario(idUsuario);
  }

  ListarEntidades(): Observable<IEntidad[]> {
    return this._administrativoGetway.ListarEntidades();
  }

  Notificaciones(): Observable<any> {
    return this._administrativoGetway.Notificaciones();
  }

  NotificacionInicioValoracion(): Observable<any> {
    return this._administrativoGetway.NotificacionInicioValoracion();
  }

  NotificacionInicioReintegro(): Observable<any> {
    return this._administrativoGetway.NotificacionInicioReintegro();
  }

  NotificacionInicioTraslado(): Observable<any> {
    return this._administrativoGetway.NotificacionInicioTraslado();
  }

  verificarLogin(data: IRequestLogin): Observable<any> {
    return this._administrativoGetway.verificarLogin(data);
  }

}
