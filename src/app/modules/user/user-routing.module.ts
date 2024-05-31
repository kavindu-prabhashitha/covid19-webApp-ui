import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { RolesComponent } from "./components/roles/roles.component";
import { PermissionsComponent } from "./components/permissions/permissions.component";
import { ManageRoleComponent } from "./components/manage-role/manage-role.component";
import { UsersComponent } from "./components/users/users.component";
import { authGuard } from "src/app/guards/auth.guard";

const routes:Routes = [
    {
        path:'',
        component:UserComponent,
        children:[
            { path:'',component:OverviewComponent},
            { path:'roles',component:RolesComponent, canActivate:[authGuard]},
            { path:'permissions',component:PermissionsComponent, canActivate:[authGuard]},
            { path:'manage-role',component:ManageRoleComponent, canActivate:[authGuard]},
            { path:'users',component:UsersComponent,canActivate:[authGuard]}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UserRoutingModule{

}