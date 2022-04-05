import { ConsolidadosComponent } from './presentation/app/pages/consolidados/consolidados.component';
import { DetalladosComponent } from './presentation/app/pages/detallados/detallados.component';
import { EditarCalendarioComponent } from './presentation/app/pages/calendario/editar/editar.component';
import { AutorizacionCarguesComponent } from './presentation/app/pages/autorizacion-cargues/autorizacion-cargues.component';
import { ListarInterfazContableComponent } from './presentation/app/pages/interfaz-contable/listar/listar.component';
import { CrearInterfazContableComponent } from './presentation/app/pages/interfaz-contable/crear/crear.component';
import { EntidadFinancieraComponent } from './presentation/app/pages/entidad-financiera/entidad-financiera.component';
import { SubMenuOrganismComponent } from './presentation/app/organisms/sub-menu-organism/sub-menu-organism.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './presentation/shared/guards/auth.guard';
import {NotFoundComponent} from './presentation/shared/components/not-found/not-found.component';
import {ContainerComponent} from './presentation/app/pages/container/container.component';
import {LoginComponent} from './presentation/app/pages/login/login.component';
import {ListarComponent} from './presentation/app/pages/archivos/listar/listar.component';
import {CargarComponent} from './presentation/app/pages/archivos/cargar/cargar.component';
import {ProfileComponent} from './presentation/app/pages/profile/profile.component';
import { ListarCalendarioComponent } from './presentation/app/pages/calendario/listar/listar.component';
import { CrearCalendarioComponent } from './presentation/app/pages/calendario/crear/crear.component';
import { AutorizacionTrasladoPdfComponent } from './presentation/app/pages/autorizacion-traslado-pdf/autorizacion-traslado-pdf.component';
import { AutorizacionReintegroPdfComponent } from './presentation/app/pages/autorizacion-reintegro-pdf/autorizacion-reintegro-pdf.component';
import { EstadoCarguesComponent } from './presentation/app/pages/reportes/estado-cargues/estado-cargues.component';
import { AutorizacionRechazoComponent } from './presentation/app/pages/autorizacion-rechazo/autorizacion-rechazo.component';
import { ListarFuncionariosComponent } from './presentation/app/pages/administrador/funcionarios/listar-funcionarios/listar-funcionarios.component';
import { FuncionarioRegistroComponent } from './presentation/app/pages/administrador/funcionarios/funcionario-registro/funcionario-registro.component';
import { ListarCargosComponent } from './presentation/app/pages/administrador/cargos/listar-cargos/listar-cargos.component';
import { CargoRegistroComponent } from './presentation/app/pages/administrador/cargos/cargo-registro/cargo-registro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: ContainerComponent,
    canActivate: [
      AuthGuard
    ],
    canActivateChild: [
      AuthGuard
    ],
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'listar', component: ListarComponent},
      {path: 'cargar', component: CargarComponent},
      {path: 'perfil', component: ProfileComponent},
      {path: 'submenu/:type', component: SubMenuOrganismComponent},
      {path: 'entidad-financiera', component: EntidadFinancieraComponent},
      {path: 'interfaz-contable-listar', component: ListarInterfazContableComponent},
      {path: 'interfaz-contable-crear', component: CrearInterfazContableComponent},
      {path: 'autorizacion-cargues', component: AutorizacionCarguesComponent},
      {path: 'autorizacion-traslado-pdf/:id', component: AutorizacionTrasladoPdfComponent},
      {path: 'autorizacion-reintegro-pdf/:id', component: AutorizacionReintegroPdfComponent},
      {path: 'autorizacion-rechazo/:id', component: AutorizacionRechazoComponent},
      {path: 'calendario', component: ListarCalendarioComponent},
      {path: 'calendario-crear', component: CrearCalendarioComponent},
      {path: 'calendario-editar', component: EditarCalendarioComponent},
      {path: 'consolidado/:type', component: ConsolidadosComponent},
      {path: 'detallado/:type', component: DetalladosComponent},
      {path: 'reporteestadocargue', component: EstadoCarguesComponent},
      {path: 'funcionario', component: ListarFuncionariosComponent},
      {path: 'funcionarioRegistro/:id', component: FuncionarioRegistroComponent},
      {path: 'cargo', component: ListarCargosComponent},
      {path: 'cargoRegistro/:id', component: CargoRegistroComponent},
      //NotFound
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
