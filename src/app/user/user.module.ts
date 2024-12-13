import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { ListaComponent } from '../countries/lista/lista.component';
import { AgregarComponent } from '../countries/agregar/agregar.component';
import { VerComponent } from '../countries/ver/ver.component';



import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent,
    ListaComponent,
    AgregarComponent,
    VerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
