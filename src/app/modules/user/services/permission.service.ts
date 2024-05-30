import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CREATE_ROLE_PERMISSION, API_GET_ROLE_PERMISSION, API_UPDATE_ROLE_PERMISSION } from 'src/app/constants';
import { ICreatePermission, IGetAllPermisions, IPermission, IUpdatePermission } from 'src/app/interfaces';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';

@Injectable()
export class PermissionService {

  constructor(private http:HttpClient) {

   }

   GetPermissions(){
     return this.http.get<ICommonResponse<IPermission[]>>(API_GET_ROLE_PERMISSION)
   }

   CreatePermission(data:ICreatePermission){
      return this.http.post<ICommonResponse<IPermission[]>>(API_CREATE_ROLE_PERMISSION,data)
   }

   UpdatePermission(data:IUpdatePermission){
    return this.http.put<ICommonResponse<IPermission[]>>(API_UPDATE_ROLE_PERMISSION,data)
   }
}
