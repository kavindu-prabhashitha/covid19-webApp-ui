import { Component } from '@angular/core';
import { Cases, ICovidCountryData } from 'src/app/interfaces';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';
import { Covid19APIService } from 'src/app/services/covid19API.service';

@Component({
  selector: 'app-search-cases',
  templateUrl: './search-cases.component.html',
  styleUrl: './search-cases.component.css'
})
export class SearchCasesComponent {
  title = 'covid19-webUI';
  searchResponseMessage="";
  countryName="";
  regionName="";
  isLoading = false;
  covidCountryCases:ICovidCountryData[] = [];

  covidCases:Cases[] = []

  constructor(private covid19DataService:Covid19APIService){

  }

  getCovidData(){
    this.isLoading = true;
    if(this.countryName && this.regionName){
      this.getCovidDataByCountryAndRegion(this.countryName,this.regionName)
      return
    }

    if(this.countryName){
      this.getCovidDataByCountry(this.countryName)
    }


    
  }

  getCovidDataByCountry(countryName:string){
    this.covid19DataService.getCovidDataByCountry(countryName).subscribe({
      next:(res:ICommonResponse<ICovidCountryData[]>) => {
          console.log(res)
          if(res){
          
          if(res.data.length===0){
            this.searchResponseMessage= `Nothing to show, data with the country name  '${this.countryName}' not found `;
            return
          }
          this.covidCountryCases = res.data;
  
          //   res.data.forEach(country => {
          //     console.log(`Country: ${country.country}, Region: ${country.region}`);
          
          //     Object.entries(country.cases).forEach(([date, caseData]) => {
          //         console.log(`Date: ${date}, Total: ${caseData.total}, New: ${caseData.new}`);
          //     });
          // });
          }
          this.isLoading = false
      },
      error: err=>{
          console.log(err)
          this.isLoading = false
      }
  })}


  getCovidDataByCountryAndRegion(countryName:string,region:string){
    this.covid19DataService.getCovidDataByCountryAndRegion(countryName,region).subscribe({
      next:(res:ICommonResponse<ICovidCountryData[]>) => {
          console.log(res)
          if(res){
          this.covidCountryCases = res.data;
          }
          this.isLoading = false
      },
      error: err=>{
          console.log(err)
          this.isLoading = false
      }
  })
}
  
  
}
