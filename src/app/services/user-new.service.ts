import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_GET_ALL_USERS, API_GET_PERMISSIONS_BY_USER_ID, API_GET_USER_BY_ID, API_UPGRADE_USER_ROLE } from 'src/app/constants';
import { IUpgradeUserRole, IUser } from 'src/app/interfaces';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserNewService {

  constructor(private http:HttpClient) { }

  GetAllUsers(){
    return this.http.get<ICommonResponse<IUser[]>>(API_GET_ALL_USERS)
  }

  GetUserById(id:number){
    return this.http.get<ICommonResponse<IUser>>(API_GET_USER_BY_ID,{
      params:{id}
    })
  }

  GetPermissionsByUserId(id:number){
    return this.http.get<ICommonResponse<number[]>>(API_GET_PERMISSIONS_BY_USER_ID,{
      params:{id}
    })
  }

  UpgradeUserRole(data:IUpgradeUserRole){
    return this.http.post<ICommonResponse<IUser>>(API_UPGRADE_USER_ROLE,data)
  }
}
