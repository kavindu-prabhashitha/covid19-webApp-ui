export interface IPermission{
    id:number
    name:string
    rPid:number
    description?:string
}

export interface IGetAllPermisions extends IPermission{

}

export interface ICreatePermission{
    name:string
    rPid:number
    description?:string
}