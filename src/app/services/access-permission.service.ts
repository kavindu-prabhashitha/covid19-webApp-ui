import { Injectable } from '@angular/core';
import { IRole, IUser } from '../interfaces';

const tempRole:IRole = {
  id:0,
  name:"",
  uid:""
}

const tempUser:IUser = {
  id:0,
  username:"Tempuser",
  role:tempRole
}

@Injectable({
  providedIn: 'root'
})
export class AccessPermissionService {
  private currentUserPermissions: number[] = []
  private authenticatedUser:IUser = tempUser

  constructor() { }

  setCurrentUserPermissions(permissions:number[]){
    this.currentUserPermissions = permissions;
    console.log("Current User Permissions : ",this.currentUserPermissions)
 }

 setAuthenticatedUser(user:IUser){
    this.authenticatedUser = user
 }

 removeAuthenticatedUser(){
   this.authenticatedUser = tempUser
 }

 removeCurrentUserPermissions(){
    this.currentUserPermissions = []
 }

 getAuthenticatedUser(){
   return this.authenticatedUser
 }

 isPermissionGranted(permissionId:number, currentUserPermissions?:number[]){
  if (!currentUserPermissions) {
      currentUserPermissions = this.currentUserPermissions;
    }

    if (!currentUserPermissions) {
      return false;
    }

    // if (!this._roles.includes(user.role)) {
    //   return false;
    // }

    return this.currentUserPermissions.includes(permissionId)
}

}
