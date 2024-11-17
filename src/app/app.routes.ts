import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InicioComponent} from './components/inicio/inicio.component';
import {PersonaListComponent} from './components/admin/persona/persona-list/persona-list.component';
import {MiembroListComponent} from './components/admin/miembro/miembro-list/miembro-list.component';
import {IglesiaListComponent} from './components/admin/iglesia/iglesia-list/iglesia-list.component';
import {IglesiaMiembroListComponent} from './components/admin/miembro-iglesia/iglesia-miembro-list/iglesia-miembro-list.component';
import {ChartsComponent} from './components/graficos/charts/charts.component';
import {authGuard} from './core/guards/auth.guard';
import {UsuarioSistemaComponent} from './components/admin/usuario-sistema/usuario-sistema.component';


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
  },
  {
    path: 'iglesia',
    component: IglesiaListComponent,
    title: 'Iglesia',
  },
  {
    path: 'miembroiglesia',
    component: IglesiaMiembroListComponent,
    title: 'Iglesia',
  },
  {
    path: 'graficoiglesias',
    component: ChartsComponent,
    title: 'Grafico',
  },
  {
    path: 'usuariosistema',
    component: UsuarioSistemaComponent,
    title: 'Usuario Sistema',
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
