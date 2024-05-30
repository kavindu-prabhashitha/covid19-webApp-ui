import { IPermission } from "./Permissions.interface"

export interface IRole{
    id:number,
    name:string
    uid:string
    extends?:number,
    rolePermissions?: IPermission[]
}

export interface IGetRoles extends IRole{
    
}

export interface IGetRoleById extends IRole{
    
}

export interface ICreateRole{
    name:string
    uid:string
    extends?:number
}

export interface IUpdateRole{
    id:number
    name?:string
    uid?:string
    description?:string
}