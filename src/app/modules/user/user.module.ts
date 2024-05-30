import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditPermissionComponent } from './components/permissions/add-edit-permission/add-edit-permission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditRoleComponent } from './components/roles/add-edit-role/add-edit-role.component';
import { ManageRoleComponent } from './components/manage-role/manage-role.component';
import { UpgradePermissionsComponent } from './components/manage-role/upgrade-permissions/upgrade-permissions.component';
import { GoToPreviousIconComponent } from 'src/app/shared/components/icons/go-to-previous-icon.component';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon.component';
import { UsersComponent } from './components/users/users.component';
import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/users/add-edit-user/add-edit-user.component';

const icons = [
  EditIconComponent,
  GoToPreviousIconComponent
]


@NgModule({
  declarations: [
    UserComponent,
    RolesComponent,
    PermissionsComponent,
    AddEditPermissionComponent,
    AddEditRoleComponent,
    ManageRoleComponent,
    UpgradePermissionsComponent,
    UsersComponent,
    ManageUsersComponent,
    AddEditUserComponent
  
  ],
  providers:[
    PermissionService,
    RoleService
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    LoadingComponent,
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    ...icons
  ]
})
export class UserModule { }
