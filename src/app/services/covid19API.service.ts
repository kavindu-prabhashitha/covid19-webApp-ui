import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  IAddCountryCaseData, ICovidCountryData, IGetCountryCaseData } from "../interfaces";
import { ICommonResponse } from "../interfaces/CommonResponse.interface";

@Injectable()
export class Covid19APIService{
    apiEndPoint = "https://localhost:44332/api/Covid19Data/country";
    apiDbImportEndPoint = "https://localhost:44332/api/Covid19Data/save-data";
    apiDbDataGetEndPoint = "https://localhost:44332/api/Covid19Data/get-db-data";
    apiDbDataGetByCountryEndPoint = "https://localhost:44332/api/Covid19Data/get-db-data-country";
    apiAddCountryCaseEndPoint = "https://localhost:44332/api/Covid19Data";

    constructor(private httpClient:HttpClient){

    }

    getAllCovid19Data(){

    }

    getCovidDataByCountry(countryName:string){
        const requestURL = `${this.apiEndPoint}`
        const params = new HttpParams()
            .set("country", countryName)
        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    getCovidDataByCountryAndRegion(countryName:string, region:string){
        const requestURL = `${this.apiEndPoint}`
        const params = new HttpParams()
            .set("country", countryName)
            .set("region",region)

        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    importDataToDatabase(countryName:string){
        const requestURL = `${this.apiDbImportEndPoint}`
        const params = new HttpParams()
            .set("country", countryName)

        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    importCountryDataFromDB(){
        const requestURL = `${this.apiDbDataGetEndPoint}`
        // const params = new HttpParams()
        //     .set("country", countryName)

        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL)
    }

    importDbDataByCountryName(countryName:string){
        const requestURL = `${this.apiDbDataGetByCountryEndPoint}`
        const params = new HttpParams()
            .set("country", countryName)

        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL,{params})
    }

    addCountryCaseData(data:IAddCountryCaseData){
        const requestURL = `${this.apiAddCountryCaseEndPoint}`
        return this.httpClient.post<ICommonResponse<IAddCountryCaseData>>(requestURL,data)
    }
}