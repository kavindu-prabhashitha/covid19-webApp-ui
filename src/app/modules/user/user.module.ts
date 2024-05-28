import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserComponent,
    RolesComponent,
    PermissionsComponent
  ],
  providers:[
    PermissionService,
    RoleService
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
