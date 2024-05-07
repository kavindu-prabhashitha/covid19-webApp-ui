import { AfterContentChecked, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICovidCountryData } from 'src/app/interfaces';
import { Covid19APIService } from 'src/app/services/covid19API.service';

interface ICountryData {
  id:string
  country:string
  region?:string
  cases:CaseData[]
}

interface CaseData {
  id:string,
  date:Date,
  total:number,
  new:number,
  countryID:number
}

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrl: './import-data.component.css'
})
export class ImportDataComponent implements AfterContentChecked{

 isLoading=false;
 countryName="";
 countryCaseData:ICovidCountryData[] = []

 constructor(private toastr:ToastrService, private apiService:Covid19APIService){

 }

 importData(){
  if(this.countryName === ''){
    this.toastr.info("Please select a Country before importing!")
    return
  }
  this.isLoading =true;
  console.log(`API request initiated : Country Name -> ${this.countryName}`)
  this.apiService.importDataToDatabase(this.countryName).subscribe({
    next:(res)=>{
      this.toastr.success(res.message);
      console.log(res)
      this.isLoading=false
    },
    error:(err)=>{
      this.toastr.warning(err);
      this.isLoading=false
    }
  })
 }

 viewImportData(){
  this.isLoading =true;
  this.apiService.importCountryDataFromDB().subscribe({
    next:(res)=>{
      this.countryCaseData = res.data
      this.toastr.success(res.message);
      console.log("Country Data Import From DB")
      console.log(this.countryCaseData)
      this.isLoading=false
    },
    error:(err)=>{
      this.toastr.warning(err);
      this.isLoading=false
    }
  })
 }

 viewImportDataByCountry(){
  this.isLoading =true;
  if(this.countryName === ''){
    this.toastr.info("Please select a Country before importing!")
    this.isLoading=false
    return
  }
  this.apiService.importDbDataByCountryName(this.countryName).subscribe({
    next:(res)=>{
      this.countryCaseData = res.data
      this.toastr.success(res.message);
      console.log("Country Data Import From DB")
      console.log(this.countryCaseData)
      this.isLoading=false
    },
    error:(err)=>{
      this.toastr.warning(err);
      this.isLoading=false
    }
  })
 }

 ngAfterContentChecked(): void {
  console.log(this.countryName);
}
 
}
