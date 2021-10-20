import { Observable } from 'rxjs';
import {IRequestLogin, IResponseLogin} from '../ilogin';

export abstract class LoginGateway {
  abstract logIn(data: IRequestLogin): Observable<IResponseLogin>;
}
