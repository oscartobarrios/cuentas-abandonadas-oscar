import { ReplaceLeftZerosPipe } from './presentation/shared/pipes/replace-leftZeros-pipe';
import { InterfazContableService } from './infraestructure/driven-adapter/interfaz-contable-api/interfaz-contable-service';
import { ListarInterfazContableComponent } from './presentation/app/pages/interfaz-contable/listar/listar.component';
import { CrearInterfazContableComponent } from './presentation/app/pages/interfaz-contable/crear/crear.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//Material
import { MaterialModule } from './presentation/shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//Domain
import {LoginGateway} from './domain/models/login/gateway/login-gateway';
import {ArchivoGateway} from './domain/models/archivo/gateway/archivo-gateway';
import { EntidadGateway } from './domain/models/entidad-financiera/gateway/entidad-gateway';

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
import { DetalladosComponent } from './presentation/app/pages/detallados/detallados.component';
import { EntidadApiService } from './infraestructure/driven-adapter/entidad-api/entidad-api.service';
import { AutorizacionTrasladoPdfComponent } from './presentation/app/pages/autorizacion-traslado-pdf/autorizacion-traslado-pdf.component';
import { NgxPrintModule } from 'ngx-print';
import { AutorizacionReintegroPdfComponent } from './presentation/app/pages/autorizacion-reintegro-pdf/autorizacion-reintegro-pdf.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteGateway } from './domain/models/reporte/gateway/reporte-gateway';
import { ReporteApiService } from './infraestructure/driven-adapter/reporte/reporte-api.service';
import { EstadoCarguesComponent } from './presentation/app/pages/reportes/estado-cargues/estado-cargues.component';
import { AutorizacionRechazoComponent } from './presentation/app/pages/autorizacion-rechazo/autorizacion-rechazo.component';
import { ListarFuncionariosComponent } from './presentation/app/pages/administrador/funcionarios/listar-funcionarios/listar-funcionarios.component';
import { FuncionarioRegistroComponent } from './presentation/app/pages/administrador/funcionarios/funcionario-registro/funcionario-registro.component';
import { ListarCargosComponent } from './presentation/app/pages/administrador/cargos/listar-cargos/listar-cargos.component';
import { CargoRegistroComponent } from './presentation/app/pages/administrador/cargos/cargo-registro/cargo-registro.component';
import { AdministrativoGateway } from './domain/models/administrativo/gateway/administrativo-gateway';
import { AministrativoApiService } from './infraestructure/driven-adapter/administrativo/administrativo-api.service';
import { CertificadosComponent } from './presentation/app/pages/archivos/certificados/certificados.component';
import { CertificadosCargarComponent } from './presentation/app/pages/archivos/certificados-cargar/certificados-cargar.component';
import { ListarEntidadesComponent } from './presentation/app/pages/administrador/entidades/listar-entidades/listar-entidades.component';
import { EntidadRegistroComponent } from './presentation/app/pages/administrador/entidades/entidad-registro/entidad-registro.component';
import { CarguesRechazadosComponent } from './presentation/app/pages/reportes/cargues-rechazados/cargues-rechazados.component';
import { CertificacionSaldosComponent } from './presentation/app/pages/reportes/certificacion-saldos/certificacion-saldos.component';
import {registerLocaleData} from '@angular/common';
import localEs from '@angular/common/locales/es';
import { ConsolidadoEntidadComponent } from './presentation/app/pages/reportes/consolidado-entidad/consolidado-entidad.component';
import { DatosReintegroTesoreroComponent } from './presentation/app/pages/autorizacionDatos/datos-reintegro-tesorero/datos-reintegro-tesorero.component';
import { DatosTrasladoTesoreroComponent } from './presentation/app/pages/autorizacionDatos/datos-traslado-tesorero/datos-traslado-tesorero.component';
import { DatosSebraComponent } from './presentation/app/pages/autorizacionDatos/datos-sebra/datos-sebra.component';
import { CambioContrasenaComponent } from './presentation/app/pages/administrador/cambio-contrasena/cambio-contrasena.component';
import { RecuperarContrasenaComponent } from './presentation/app/pages/administrador/recuperar-contrasena/recuperar-contrasena.component';
import { ListarValorComponent } from './presentation/app/pages/subasta/GenerarValor/listar-valor/listar-valor.component';
import { CalcularValorComponent } from './presentation/app/pages/subasta/GenerarValor/calcular-valor/calcular-valor.component';
import { SubastaGateway } from './domain/models/subasta/gateway/subasta-gateway';
import { SubastaApiService } from './infraestructure/driven-adapter/subasta/subasta-api-service';
import { ListarAdjudicacionComponent } from './presentation/app/pages/subasta/Adjudicacion/listar-adjudicacion/listar-adjudicacion.component';
import { RegistrarAdjudicacionComponent } from './presentation/app/pages/subasta/Adjudicacion/registrar-adjudicacion/registrar-adjudicacion.component';
import { ListarSubastaComponent } from './presentation/app/pages/subasta/Adjudicacion/listar-subasta/listar-subasta.component';
import { AdjudicacionSubastaComponent } from './presentation/app/pages/reportes/adjudicacion-subasta/adjudicacion-subasta.component';
import { RegistrarActualizarFuncionarioEntidadComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/registrar-actualizar-funcionario-entidad/registrar-actualizar-funcionario-entidad.component';
import { ListarFuncionarioSubataComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-funcionario-subata/listar-funcionario-subata.component';
import { ListarFuncionarioTecnologicoComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-funcionario-tecnologico/listar-funcionario-tecnologico.component';
import { ListarFuncionarioAplicativoComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-funcionario-aplicativo/listar-funcionario-aplicativo.component';
import { ListarFuncionarioFinancieroComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-funcionario-financiero/listar-funcionario-financiero.component';
import { ListarRevisorFiscalComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-revisor-fiscal/listar-revisor-fiscal.component';
import { ListarRepresentanteLegalComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/listar-representante-legal/listar-representante-legal.component';
import { EnvioCorreoLiderEntidadComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/envio-correo-lider-entidad/envio-correo-lider-entidad.component';
import { RechazarNotificacionComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/administrador-lider-entidad/rechazar-notificacion/rechazar-notificacion.component';
import { ListarCorreoComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/administrador-lider-entidad/listar-correo/listar-correo.component';
import { DetalleTesoreroEntidadComponent } from './presentation/app/pages/administrador/recurso-humano-entidad/detalle-tesorero-entidad/detalle-tesorero-entidad.component';
import { AutorizacionOrdenesSebraComponent } from './presentation/app/pages/autorizacion-ordenes-sebra/autorizacion-ordenes-sebra.component';
import { CertificadosAprobadosComponent } from './presentation/app/pages/archivos/certificados-aprobados/certificados-aprobados.component';
import { DatosActualizacionReintegroTesoreroComponent } from './presentation/app/pages/autorizacionDatos/datos-actualizacion-reintegro-tesorero/datos-actualizacion-reintegro-tesorero.component';

//Api services
export const API_GATEWAYS_PROVIDERS = [
  { provide: LoginGateway, useClass: LoginApiService},
  { provide: ArchivoGateway, useClass: ArchivoApiService},
  { provide: ReporteGateway, useClass: ReporteApiService},
  { provide: InterfazContableGateway, useClass: InterfazContableService},
  { provide: CalendarioGateway, useClass: CalendarioService},
  { provide: EntidadGateway, useClass: EntidadApiService},
  { provide: AdministrativoGateway, useClass: AministrativoApiService},
  { provide: SubastaGateway, useClass: SubastaApiService},
];

registerLocaleData(localEs);

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
    ConsolidadosComponent,
    DetalladosComponent,
    ReplaceLeftZerosPipe,
    AutorizacionTrasladoPdfComponent,
    AutorizacionReintegroPdfComponent,
    EstadoCarguesComponent,
    AutorizacionRechazoComponent,
    ListarFuncionariosComponent,
    FuncionarioRegistroComponent,
    ListarCargosComponent,
    CargoRegistroComponent,
    CertificadosComponent,
    CertificadosAprobadosComponent,
    CertificadosCargarComponent,
    ListarEntidadesComponent,
    EntidadRegistroComponent,
    CarguesRechazadosComponent,
    CertificacionSaldosComponent,
    ConsolidadoEntidadComponent,
    DatosReintegroTesoreroComponent,
    DatosTrasladoTesoreroComponent,
    DatosSebraComponent,
    CambioContrasenaComponent,
    RecuperarContrasenaComponent,
    ListarValorComponent,
    CalcularValorComponent,
    ListarAdjudicacionComponent,
    RegistrarAdjudicacionComponent,
    ListarSubastaComponent,
    AdjudicacionSubastaComponent,
    RegistrarActualizarFuncionarioEntidadComponent,
    ListarFuncionarioSubataComponent,
    ListarFuncionarioTecnologicoComponent,
    ListarFuncionarioAplicativoComponent,
    ListarFuncionarioFinancieroComponent,
    ListarRevisorFiscalComponent,
    ListarRepresentanteLegalComponent,
    EnvioCorreoLiderEntidadComponent,
    RechazarNotificacionComponent,
    ListarCorreoComponent,
    DetalleTesoreroEntidadComponent,
    AutorizacionOrdenesSebraComponent,
    DatosActualizacionReintegroTesoreroComponent
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
    NgbModule,
    NgxPrintModule,
    NgbModule,
    MatTableModule,
    MatButtonModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    NgxDatatableModule

  ],
  providers: [
  	API_GATEWAYS_PROVIDERS,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaKey } as RecaptchaSettings,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
