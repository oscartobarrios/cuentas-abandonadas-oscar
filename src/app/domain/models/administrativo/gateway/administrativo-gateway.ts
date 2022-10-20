import {Observable} from 'rxjs';
import { EntidadFinanciera } from '../../entidad-financiera/entidad-financiera';
import { IRequestLogin } from '../../login/ilogin';
import { FuncionarioModelo } from '../funcionario';
import { ICargo } from '../icargo';
import { IEntidad } from '../ientidad';
import { IFuncionario } from '../iFuncionario';
import { IUsuario } from '../iusuario';

export abstract class AdministrativoGateway {
  abstract insertarCargo(ICargo: ICargo): Observable<any>;
  abstract insertarEntidad(IEntidad: EntidadFinanciera): Observable<any>;
  abstract actualizarEntidad(IEntidad: EntidadFinanciera): Observable<any>;
  abstract ListarCargos(): Observable<ICargo[]>;
  abstract consultarCargo(idCargo:number): Observable<ICargo>;
  abstract consultarEntidad(idEntidad:number): Observable<IEntidad>;
  abstract ListarUsuarios(): Observable<IUsuario[]>;
  abstract ListarFuncionarios(): Observable<IFuncionario[]>;
  abstract insertarFuncionario(IFuncionario: FuncionarioModelo): Observable<any>;
  abstract consultarFuncionario(idFuncionario:number): Observable<any>;
  abstract consultarUsuario(idUsuario:number): Observable<any>;
  abstract ListarEntidades(): Observable<IEntidad[]>;
  abstract Notificaciones(): Observable<any>;
  abstract NotificacionInicioValoracion(): Observable<any>;
  abstract NotificacionInicioReintegro(): Observable<any>;
  abstract NotificacionInicioTraslado(): Observable<any>;
  abstract verificarLogin(data: IRequestLogin): Observable<any>;
  abstract ActualizarClave(data:any): Observable<any>;
  abstract enviarcodigoverificacion(usuario: string): Observable<any>;
  abstract ConsultarUsuarioPorNombre(usuario: string): Observable<any>;
  abstract ConsultarUsuarioPorNombre(usuario: string): Observable<any>;
  abstract insertarActualizarFuncionarioEntidad(data: any): Observable<any>;
  abstract ListarFuncionarioEntidadPorTipo(tipo: string): Observable<any[]>;
  abstract ListarFuncionarioEntidadPorId(id: number): Observable<any>;
}
