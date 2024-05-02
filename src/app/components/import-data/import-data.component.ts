import { AfterContentChecked, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrl: './import-data.component.css'
})
export class ImportDataComponent implements AfterContentChecked{

 isLoading=false;
 countryName="";

 constructor(private toastr:ToastrService){

 }

 importData(){
  this.isLoading = true
  setTimeout(()=>{
    this.isLoading=false
    this.toastr.success("Data saved to DB","DB Operation success")
  },5000);

 }

 ngAfterContentChecked(): void {
  console.log(this.countryName);
}
 
}
