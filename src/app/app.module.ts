import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//Material
import { MaterialModule } from './presentation/shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//Domain
import {LoginGateway} from './domain/models/login/gateway/login-gateway';
import {ArchivoGateway} from './domain/models/archivo/gateway/archivo-gateway';

//Infraestructure

import {LoginApiService} from './infraestructure/driven-adapter/login-api/login-api.service';
import {ArchivoApiService} from './infraestructure/driven-adapter/archivo-api/archivo-api.service';
import { UIIntegratorModule } from './presentation/shared/modules/ui-integrator.module';
import { InterceptorsIntegratorModule } from './presentation/shared/modules/interceptors-integrator.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './presentation/app/pages/container/container.component';
import {environment} from '../environments/environment';
import {ErrorArchivoDialogComponent, ListarComponent} from './presentation/app/pages/archivos/listar/listar.component';
import { LoginComponent } from './presentation/app/pages/login/login.component';
import { CargarComponent } from './presentation/app/pages/archivos/cargar/cargar.component';
import { ProfileComponent } from './presentation/app/pages/profile/profile.component';

//Api services
export const API_GATEWAYS_PROVIDERS = [
  { provide: LoginGateway, useClass: LoginApiService},
  { provide: ArchivoGateway, useClass: ArchivoApiService}
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LoginComponent,
    ListarComponent,
    CargarComponent,
    ProfileComponent,
    ErrorArchivoDialogComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //Material
    MaterialModule,
    FlexLayoutModule,
    //App
    UIIntegratorModule,
    InterceptorsIntegratorModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
  	API_GATEWAYS_PROVIDERS,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaKey } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
