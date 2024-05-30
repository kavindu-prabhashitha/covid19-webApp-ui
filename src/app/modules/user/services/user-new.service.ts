import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_GET_ALL_USERS, API_UPGRADE_USER_ROLE } from 'src/app/constants';
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

  UpgradeUserRole(data:IUpgradeUserRole){
    return this.http.post<ICommonResponse<IUser>>(API_UPGRADE_USER_ROLE,data)
  }
}
