import {IRequestLogin, IResponseLogin} from '../../login/ilogin';
import {Observable} from 'rxjs';
import {Itipocargue} from '../itipocargue';
import {ICargue} from '../icargue';
import {IArchivo} from '../iarchivo';
import {ICambiarEstado} from '../icambiar-estado';
import { IConsolidado } from '../iconsolidado';

export abstract class ArchivoGateway {

  abstract TipoCargue(): Observable<Itipocargue[]>;
  abstract Listar(idOrganizacion: any): Observable<ICargue[]>;
  abstract CarguesXEstado(estado: any): Observable<ICargue[]>;
  abstract Cargar(data: IArchivo): Observable<any>;
  abstract LogCargue(idCargue): Observable<any>;
  abstract CambiarEstadoCargue(data: ICambiarEstado): Observable<any>;
  abstract GetConsolidado(tipoArchivo: string, estado: string): Observable<IConsolidado[]>;

}
