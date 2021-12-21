import { InterfazContableService } from './infraestructure/driven-adapter/interfaz-contable-api/interfaz-contable-service';
import { ListarInterfazContableComponent } from './presentation/app/pages/interfaz-contable/listar/listar.component';
import { CrearInterfazContableComponent } from './presentation/app/pages/interfaz-contable/crear/crear.component';
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
import { CardAtomComponent } from './presentation/app/atoms/card-atom/card-atom.component';
import { SubMenuOrganismComponent } from './presentation/app/organisms/sub-menu-organism/sub-menu-organism.component';
import { EntidadFinancieraComponent } from './presentation/app/pages/entidad-financiera/entidad-financiera.component';
import { RecursoHumanoComponent } from './presentation/app/pages/entidad-financiera/recurso-humano/recurso-humano.component';
import { ModalDireccionComponent } from './presentation/shared/modal-direccion/modal-direccion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntidadFinancieraFormComponent } from './presentation/app/pages/entidad-financiera/entidad-financiera-form/entidad-financiera-form.component';
import { InterfazContableGateway } from './domain/models/interfaz-contable/gateway/interfaz-contable-gateway';
import { AutorizacionCarguesComponent } from './presentation/app/pages/autorizacion-cargues/autorizacion-cargues.component';
import { CrearCalendarioComponent } from './presentation/app/pages/calendario/crear/crear.component';
import { ListarCalendarioComponent } from './presentation/app/pages/calendario/listar/listar.component';
import { CalendarioGateway } from './domain/models/calendario/gateway/calendario-gateway';
import { CalendarioService } from './infraestructure/driven-adapter/calendario-api/calendario-service';
import { EditarCalendarioComponent } from './presentation/app/pages/calendario/editar/editar.component';
import { ConsolidadosComponent } from './presentation/app/pages/consolidados/consolidados.component';

//Api services
export const API_GATEWAYS_PROVIDERS = [
  { provide: LoginGateway, useClass: LoginApiService},
  { provide: ArchivoGateway, useClass: ArchivoApiService},
  { provide: InterfazContableGateway, useClass: InterfazContableService},
  { provide: CalendarioGateway, useClass: CalendarioService}
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LoginComponent,
    ListarComponent,
    CargarComponent,
    ProfileComponent,
    ErrorArchivoDialogComponent,
    CardAtomComponent,
    SubMenuOrganismComponent,
    EntidadFinancieraComponent,
    RecursoHumanoComponent,
    ModalDireccionComponent,
    EntidadFinancieraFormComponent,
    CrearInterfazContableComponent,
    ListarInterfazContableComponent,
    AutorizacionCarguesComponent,
    ListarCalendarioComponent,
    CrearCalendarioComponent,
    EditarCalendarioComponent,
    ConsolidadosComponent
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
    NgbModule
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
