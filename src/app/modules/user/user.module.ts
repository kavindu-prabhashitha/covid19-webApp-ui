import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { RolesComponent } from './components/roles/roles.component';



@NgModule({
  declarations: [
    UserComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
