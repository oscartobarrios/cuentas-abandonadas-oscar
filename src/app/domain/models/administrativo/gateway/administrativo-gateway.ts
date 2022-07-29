import {Observable} from 'rxjs';
import { EntidadFinanciera } from '../../entidad-financiera/entidad-financiera';
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

}
