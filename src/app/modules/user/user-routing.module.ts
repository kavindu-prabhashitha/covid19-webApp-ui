import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { RolesComponent } from "./components/roles/roles.component";
import { PermissionsComponent } from "./components/permissions/permissions.component";

const routes:Routes = [
    {
        path:'',
        component:UserComponent,
        children:[
            { path:'',component:OverviewComponent},
            { path:'roles',component:RolesComponent},
            { path:'permissions',component:PermissionsComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UserRoutingModule{

}