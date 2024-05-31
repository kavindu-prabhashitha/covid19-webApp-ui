import { Injectable } from '@angular/core';
import { Permissions } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AccessPermissionService {
  private currentUserPermissions: number[] = []

  constructor() { }

  setCurrentUserPermissions(permissions:number[]){
    this.currentUserPermissions = permissions;
    console.log("Current User Permissions : ",this.currentUserPermissions)
 }

 removeCurrentUserPermissions(){
    this.currentUserPermissions = []
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
