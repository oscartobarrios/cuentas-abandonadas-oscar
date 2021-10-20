import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './presentation/shared/guards/auth.guard';
import {NotFoundComponent} from './presentation/shared/components/not-found/not-found.component';
import {ContainerComponent} from './presentation/app/pages/container/container.component';
import {LoginComponent} from './presentation/app/pages/login/login.component';
import {ListarComponent} from './presentation/app/pages/archivos/listar/listar.component';
import {CargarComponent} from './presentation/app/pages/archivos/cargar/cargar.component';
import {ProfileComponent} from './presentation/app/pages/profile/profile.component';

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
