import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_GET_ROLES } from 'src/app/constants';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';
import { IGetRoles } from 'src/app/interfaces/Roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  GetRoles(){
    return this.http.get<ICommonResponse<IGetRoles[]>>(API_GET_ROLES)
  }
}
