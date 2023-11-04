import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpCredentialsInterceptor implements HttpInterceptor {

  constructor(
    private _storageservice: StorageService,
    private _router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this._storageservice.getItem('auth');
    const payload = this._storageservice.getItem('payload');
    if (auth) {
      if (payload.token) {
        if (request.body instanceof FormData) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${payload.token}`,
              'ContentType': 'multipart/form-data'
            }
          });
        } else {
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${payload.token}`,
              'Content-Type': 'application/json',
            }
          });
        }
      }
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._storageservice.clear();
          this._router.navigate(['/login']);
        }
        return throwError( err );
      })
    );
  }

}
