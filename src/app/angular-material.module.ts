import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';

const modules = [
    MatDialogModule
]

@NgModule({
    imports:[...modules],
    exports:[...modules]
})
export class AngularMaterialModule{

}