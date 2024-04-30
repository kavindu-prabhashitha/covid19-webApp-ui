import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  ICovidCountryData } from "../interfaces";
import { ICommonResponse } from "../interfaces/CommonResponse.interface";

@Injectable()
export class Covid19APIService{
    apiEndPoint = "https://localhost:44332/api/Covid19Data/country";
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
}