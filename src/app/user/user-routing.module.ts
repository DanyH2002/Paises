import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ListaComponent } from './lista/lista.component';
import { AddComponent } from './add/add.component';
import { VerComponent } from './ver/ver.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent,
    children: [
      { path: '/', component: ListaComponent },
      { path: 'viewUser/:id', component: VerComponent },
      { path: 'updateUser/:id', component: AddComponent },
      { path: '**', redirectTo: '' },
    ]
  },
  {
    path: '', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
