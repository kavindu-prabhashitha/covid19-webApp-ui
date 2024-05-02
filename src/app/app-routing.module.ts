import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { SearchCasesComponent } from "./components/search-cases/search-cases.component";
import { ImportDataComponent } from "./components/import-data/import-data.component";

const routes:Routes = [
    {path:'',
     children:[
            {path:'',component:SearchCasesComponent},
            {path:'import-case',component:ImportDataComponent}
        ]

    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}