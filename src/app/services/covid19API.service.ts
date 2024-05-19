import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  IAddCountryCaseData, ICovidCountryData, IGetCountryCaseData, IUpdateCountryCaseData } from "../interfaces";
import { ICommonResponse } from "../interfaces/CommonResponse.interface";
import { 
    API_ADD_COUNTRY_CASE_TO_DB,
    API_ALL_COVID19_DATA, 
    API_GET_ALL_DB_COUNTRY_DATA, 
    API_GET_DB_COUNTRY_NAMES, 
    API_GET_DB_DATA_BY_COUNTRY_NAME, 
    API_SAVE_DATA_DB, 
    API_UPDATE_COUNTRY_CASE_TO_DB } from "../constants";

@Injectable()
export class Covid19APIService{

    constructor(private httpClient:HttpClient){}

    getAllCovid19Data(){}

    getCovidDataByCountry(countryName:string){
        const requestURL = API_ALL_COVID19_DATA
        const params = new HttpParams()
            .set("country", countryName)
        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    getCovidDataByCountryAndRegion(countryName:string, region:string){
        const requestURL = API_ALL_COVID19_DATA
        const params = new HttpParams()
            .set("country", countryName)
            .set("region",region)

        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    importDataToDatabase(countryName:string){
        const requestURL = API_SAVE_DATA_DB
        const params = new HttpParams()
            .set("country", countryName)

        return this.httpClient.get<ICommonResponse<ICovidCountryData[]>>(requestURL,{params})
    }

    importCountryDataFromDB(){
        const requestURL = API_GET_ALL_DB_COUNTRY_DATA
        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL)
    }

    importDbDataByCountryName(countryName:string){
        const requestURL = API_GET_DB_DATA_BY_COUNTRY_NAME
        const params = new HttpParams()
            .set("country", countryName)

        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL,{params})
    }

    addCountryCaseData(data:IAddCountryCaseData){
        const requestURL = API_ADD_COUNTRY_CASE_TO_DB
        return this.httpClient.post<ICommonResponse<IAddCountryCaseData>>(requestURL,data)
    }
    updateCountryCaseData(data:IUpdateCountryCaseData){
        const requestURL = API_UPDATE_COUNTRY_CASE_TO_DB
        return this.httpClient.put<ICommonResponse<IUpdateCountryCaseData>>(requestURL,data)
    }

    getDbCountryNamesList(){
        const requestURL = API_GET_DB_COUNTRY_NAMES
        return this.httpClient.get<ICommonResponse<IGetCountryCaseData[]>>(requestURL)
    }
}