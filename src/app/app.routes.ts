import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InicioComponent} from './components/inicio/inicio.component';
import {PersonaListComponent} from './components/admin/persona/persona-list/persona-list.component';
import {MiembroListComponent} from './components/admin/miembro/miembro-list/miembro-list.component';
import {IglesiaListComponent} from './components/admin/iglesia/iglesia-list/iglesia-list.component';
import {IglesiaMiembroListComponent} from './components/admin/miembro-iglesia/iglesia-miembro-list/iglesia-miembro-list.component';
import {ChartsComponent} from './components/graficos/charts/charts.component';
import {authGuard} from './core/guards/auth.guard';
import {LoginComponent} from './components/auth/login2/login.component';
import {UserTableComponent} from './components/admin/usuario-sistema/user-table/user-table.component';
import {adminGuard} from './core/guards/admin.guard';
import {encIglesiaGuard} from './core/guards/enc-iglesia.guard';


export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    title: 'Inicio',
  },
  {
    path: 'miembro',
    component: MiembroListComponent,
    title: 'Mimembro',
    canActivate :[authGuard]
  },
  {
    path: 'persona',
    component: PersonaListComponent,
    title: 'Persona',
    canActivate :[authGuard]
  },
  {
    path: 'iglesia',
    component: IglesiaListComponent,
    title: 'Iglesia',
    canActivate :[authGuard]
  },
  {
    path: 'miembroiglesia',
    component: IglesiaMiembroListComponent,
    title: 'Iglesia',
    canActivate :[authGuard]
  },
  {
    path: 'graficoiglesias',
    component: ChartsComponent,
    title: 'Grafico',
    canActivate :[authGuard]
  },
  {
    path: 'usuariosistema',
    component: UserTableComponent,
    title: 'Usuario Sistema',
    canActivate :[authGuard, adminGuard]
  },


  { path: '**', redirectTo: '' },
];


// RUTAS CON GUARDS ANIDADOS
// export const routes: Routes = [
//   {
//     path: '',
//     component: InicioComponent,
//     title: 'Inicio',
//   },
//   {
//     path: 'miembro',
//     component: MiembroListComponent,
//     title: 'Miembro',
//     canActivate: [multiGuard],  // Usar la función guard
//   },
//   {
//     path: 'persona',
//     component: PersonaListComponent,
//     title: 'Persona',
//     canActivate: [multiGuard],
//   },
//   {
//     path: 'iglesia',
//     component: IglesiaListComponent,
//     title: 'Iglesia',
//     canActivate: [multiGuard],
//   },
//   { path: '**', redirectTo: '' },
// ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
