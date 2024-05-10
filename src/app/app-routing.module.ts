import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { SearchCasesComponent } from "./components/search-cases/search-cases.component";
import { ImportDataComponent } from "./components/import-data/import-data.component";
import { LoginComponent } from "./components/login/login.component";

const routes:Routes = [
    {path:'',
     children:[
            {path:'',component:SearchCasesComponent},
            {path:'import-case',component:ImportDataComponent},
            {path:'login', component:LoginComponent}
        ]

    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}