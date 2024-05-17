import { UserRole } from "../constants/UserRoles.enum";

export interface User{
    userName:string;
    role: UserRole
}