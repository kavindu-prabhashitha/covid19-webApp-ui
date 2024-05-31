import { NgModule } from "@angular/core";
import { IsPermissionGrantedDirective } from "../directives/is-permission-granted.directive";
import { EditIconComponent } from "./components/icons/edit-icon.component";
import { UserNewService } from "../services/user-new.service";

const components = [
    IsPermissionGrantedDirective,
    
]

@NgModule({
    declarations:[
        ...components
    ],
    providers:[UserNewService],
    exports:[
        ...components
    ]
})
export class SharedModule{

}