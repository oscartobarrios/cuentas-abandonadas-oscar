import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Interceptors
import { HttpErrorInterceptor } from './../interceptors/http-error-interceptor.service';
import { HttpRetryInterceptor } from './../interceptors/http-retry-interceptor.service';
import { HttpCredentialsInterceptor } from './../interceptors/http-credentials-interceptor.service';

import { StorageService } from './../services/storage.service';
import { environment } from './../../../../environments/environment';

export const HTTP_CUSTOM_INTERCEPTORS = [
  // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialsInterceptor, multi: true, deps: [StorageService] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
  	HttpClientModule
  ],
  providers: [
    StorageService,
  	HTTP_CUSTOM_INTERCEPTORS
  ]
})
export class InterceptorsIntegratorModule { }
