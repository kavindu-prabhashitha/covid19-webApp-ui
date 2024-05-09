import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGetCountryCaseData, IUpdateCountryCaseData } from 'src/app/interfaces';
import { Covid19APIService } from 'src/app/services/covid19API.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { AddEditCountryCaseComponent } from '../add-edit-country-case/add-edit-country-case.component';
import { MatDialog } from '@angular/material/dialog';


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
export class ImportDataComponent implements AfterContentChecked, OnInit{

 isLoading=false;
 addEditModalOpen = false;
 countryName="";
 countryCaseData:IGetCountryCaseData[] = []
 editRecord = false;
 countryList!:string[];


 constructor(
  private toastr:ToastrService, 
  private apiService:Covid19APIService,
  private modalService:ModalService,
  private matDialog:MatDialog
){

 }
  ngOnInit(): void {
    this.getCountryNameList()
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
      this.countryCaseData = res.data;

      if(res.data.length === 0 ){
        this.toastr.warning(`Data Not Available by the ${this.countryName}`);
        this.isLoading = false;
        return
      }
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



 editCountryCaseData(countryRecId:number, caseId:number,country:string, region:string, caseData:any){
  const updateCaseData: IUpdateCountryCaseData = {
    id: countryRecId,
    country:country,
    region:region,
    case:{
      id:Number(caseId),
      date:caseData.date,
      new:Number(caseData.new),
      total:Number(caseData.total)
    }
  }
  console.log(`update record : `,updateCaseData)

  this.openEditCountryCaseDataModal(updateCaseData)
 }

 openAddCaseModalComponent(){
  const dialogRef =  this.matDialog.open(AddEditCountryCaseComponent)

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result from Add Country Case: ${result}`);
    this.ngOnInit()
  });
 }

 openEditCountryCaseDataModal(data:IUpdateCountryCaseData){
  const dialogRef = this.matDialog.open(AddEditCountryCaseComponent, {
    data:data
  })

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.viewImportDataByCountry()
  });
 
 }

 getCountryNameList(){
  this.apiService.getDbCountryNamesList().subscribe({
    next: res=>{
      console.log(res);
      let names = this.setCountryNameList(res.data)
      console.log("Country Names : ",names);
      this.countryList = names

    },
    error: err =>{
      console.log(err)
    }
  })
 }

 setCountryNameList(countryData : IGetCountryCaseData[]) : string[]{
    const countryNames:string[] = [];
    countryData.forEach((data)=>{
      if(!(countryNames.includes(data.country))){
        countryNames.push(data.country)
      }
    })
    return countryNames
 }


 ngAfterContentChecked(): void {
  console.log(this.countryName);
}
 
}
