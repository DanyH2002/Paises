import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './user/add/add.component';
import { MenuComponent } from './menu/menu.component';
import { authGuard } from './guards/auth.guard';
import { ListaComponent } from './countries/lista/lista.component';
import { AgregarComponent } from './countries/agregar/agregar.component';
import { VerComponent } from './countries/ver/ver.component';

const routes: Routes = [
  { path: 'countries', component: ListaComponent, canActivate: [authGuard]},
  { path: 'countries/newCountry', component: AgregarComponent, canActivate: [authGuard]},
  { path: 'countries/:id', component: VerComponent, canActivate: [authGuard]},
  { path: 'countries/updateCountry/:id', component: AgregarComponent, canActivate: [authGuard]},

  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'menu', component: MenuComponent },
  { path: 'sigin', component: AddComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
