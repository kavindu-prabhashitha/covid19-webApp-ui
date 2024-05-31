import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { SearchCasesComponent } from "./components/search-cases/search-cases.component";
import { ImportDataComponent } from "./components/import-data/import-data.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { authGuard } from "./guards/auth.guard";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";

const routes:Routes = [
    {path:'',
     children:[
            {path:'',component:SearchCasesComponent},
            {path:'import-case',component:ImportDataComponent, canActivate:[authGuard]},
            {path:'login', component:LoginComponent},
            {path:'register', component:RegisterComponent},
            {path:'profile', component:UserProfileComponent, canActivate:[authGuard]},
            {
                path:'user-module', 
                loadChildren:()=> import("./modules/user/user.module").then((m)=> m.UserModule)
            },
        ]

    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}