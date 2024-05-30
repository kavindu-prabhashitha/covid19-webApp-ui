import { UserRole } from "../constants/UserRoles.enum";
import { IRole } from "./Roles.interface";

export interface User{
    userName:string;
    role: UserRole
}

export interface IUser{
    id:number,
    username:string,
    role:IRole
}

export interface IUpgradeUserRole{
    userId:number,
    roleId:number
}