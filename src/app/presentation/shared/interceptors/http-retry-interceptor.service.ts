import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, delay, retryWhen } from 'rxjs/operators';

export const RETRY_COUNT = 3;
export const RETRY_WAIT_MILLISECONDS = 3000;
export const RETRY_IF_CODE_ERROR_IS = [ 503]; // 503 = Service Unavailable

export class HttpRetryInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	return next.handle(request).pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((error, count) => {
          	if (count <= RETRY_COUNT && (RETRY_IF_CODE_ERROR_IS.indexOf(error.status) > -1)) {
            	console.log(`Error code... ${error.status}`);
            	console.log(`Retry request... ${count}`);
              return of(error);
            }
            return throwError(error);
          }),
          delay(RETRY_WAIT_MILLISECONDS)
        )
      )
    );
  }
}
