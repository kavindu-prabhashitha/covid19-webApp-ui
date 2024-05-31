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

export interface IUpdatePermission{
    id:number
    name?:string
    rPid?:number
    description?:string
}

export interface IUpgradeRolePermission{
    userRoleId:number,
    permissionIds :number[]
}

export interface IRemoveRolePermission{
    userRoleId:number,
    permissionId :number
}