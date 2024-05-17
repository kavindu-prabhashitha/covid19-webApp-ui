import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  IAddCountryCaseData, ICovidCountryData, IGetCountryCaseData, IUpdateCountryCaseData } from "../interfaces";
import { ICommonResponse } from "../interfaces/CommonResponse.interface";
import { API_PORT, API_PROTOCOL } from "./auth.service";

@Injectable()
export class Covid19APIService{
    apiEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/country`;
    apiDbImportEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/save-data`;
    apiDbDataGetEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-db-data`;
    apiDbDataGetByCountryEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-db-data-country`;
    apiAddCountryCaseEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data`;
    apiUpdateCountryCaseEndPoint = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data`;
    apiDbCountryNames = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-all-country-names`

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
    updateCountryCaseData(data:IUpdateCountryCaseData){
        const requestURL = `${this.apiUpdateCountryCaseEndPoint}`
        return this.httpClient.put<ICommonResponse<IUpdateCountryCaseData>>(requestURL,data)
    }

    getDbCountryNamesList(){
        const requestURL = `${this.apiDbCountryNames}`
        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL)
    }
}