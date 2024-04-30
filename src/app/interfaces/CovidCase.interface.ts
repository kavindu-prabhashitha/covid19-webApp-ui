export interface ICovidCountryData {
    country:string
    region:string
    cases: Cases[]
}

export interface CaseData {
    total:number;
    new:number;
}

export interface Cases {
    [date:string]:CaseData
}