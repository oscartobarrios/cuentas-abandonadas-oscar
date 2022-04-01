import {Observable} from 'rxjs';
import { FuncionarioModelo } from '../funcionario';
import { ICargo } from '../icargo';
import { IFuncionario } from '../iFuncionario';
import { IUsuario } from '../iusuario';

export abstract class AdministrativoGateway {
  abstract insertarCargo(ICargo: ICargo): Observable<any>;
  abstract ListarCargos(): Observable<ICargo[]>;
  abstract consultarCargo(idCargo:number): Observable<ICargo>;
  abstract ListarUsuarios(): Observable<IUsuario[]>;
  abstract ListarFuncionarios(): Observable<IFuncionario[]>;
  abstract insertarFuncionario(IFuncionario: FuncionarioModelo): Observable<any>;
  abstract consultarFuncionario(idFuncionario:number): Observable<any>;
  abstract consultarUsuario(idUsuario:number): Observable<any>;
  
}