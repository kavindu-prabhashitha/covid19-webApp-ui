import { AfterContentChecked, Component } from '@angular/core';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrl: './import-data.component.css'
})
export class ImportDataComponent implements AfterContentChecked{

 isLoading=false;
 countryName="";

 importData(){
  this.isLoading = true
  setTimeout(()=>{
    this.isLoading=false
  },5000);

 }

 ngAfterContentChecked(): void {
  console.log(this.countryName);
}
 
}
