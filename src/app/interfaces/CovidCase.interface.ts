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

export interface IGetCountryCaseData {
    id:number
    country:string
    region:string
    cases:[{
        id:number
        date:Date,
        total:number,
        new:number
    }]
}


export interface IAddCountryCaseData {
    country:string
    region:string
    case:{
        date:Date,
        total:number,
        new:number
    }

}

export interface IUpdateCountryCaseData {
    id:number
    country:string
    region:string
    case:{
        id:number
        date:Date,
        total:number,
        new:number
    }

}