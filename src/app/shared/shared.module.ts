import { NgModule } from "@angular/core";
import { IsPermissionGrantedDirective } from "../directives/is-permission-granted.directive";
import { UserNewService } from "../services/user-new.service";
import { LoadingComponent } from "./components/loading/loading.component";


const components = [
    IsPermissionGrantedDirective
    
]

@NgModule({

    declarations:[
        ...components,
        LoadingComponent
    ],
    providers:[UserNewService],
    exports:[
        ...components,
        LoadingComponent
    ]
})
export class SharedModule{

}