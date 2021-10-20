import {Injectable} from '@angular/core';
import {IRequestLogin, IResponseLogin} from '../../models/login/ilogin';
import {Observable} from 'rxjs';
import {LoginGateway} from '../../models/login/gateway/login-gateway';

@Injectable({
  providedIn: 'root'
})
export class GetLoginUseCaseService {

  constructor(private _loginGateway: LoginGateway) {
  }

  logIn(data: IRequestLogin): Observable<IResponseLogin> {
    return this._loginGateway.logIn(data);
  }

}
