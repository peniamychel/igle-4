import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InicioComponent} from './components/inicio/inicio.component';
import {PersonaListComponent} from './components/conten-sidebar/persona/persona-list/persona-list.component';
import {MiembroListComponent} from './components/conten-sidebar/miembro/miembro-list/miembro-list.component';
import {IglesiaListComponent} from './components/conten-sidebar/iglesia/iglesia-list/iglesia-list.component';

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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
