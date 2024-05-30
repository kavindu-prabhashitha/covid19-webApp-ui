import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CREATE_ROLE, API_GET_ROLES, API_GET_ROLE_BY_ID, API_UPDATE_ROLE, API_UPGRADE_ROLE_PERMISSION } from 'src/app/constants';
import { IUpgradeRolePermission } from 'src/app/interfaces';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';
import { ICreateRole, IGetRoleById, IGetRoles, IUpdateRole } from 'src/app/interfaces/Roles.interface';

@Injectable()
export class RoleService {

  constructor(private http:HttpClient) { }

  GetRoles(){
    return this.http.get<ICommonResponse<IGetRoles[]>>(API_GET_ROLES)
  }

  GetRoleById(id:number){
    return this.http.get<ICommonResponse<IGetRoleById>>(API_GET_ROLE_BY_ID,{
      params:{
        id
      }
    })
  }

  CreateRole(data:ICreateRole){
    return this.http.post<ICommonResponse<IGetRoles[]>>(API_CREATE_ROLE,data)
  }

  UpdateRole(data:IUpdateRole){
    return this.http.put<ICommonResponse<IGetRoleById>>(API_UPDATE_ROLE,data)
  }

  UpgradeRolePermissions(data:IUpgradeRolePermission){
    return this.http.post<ICommonResponse<IGetRoleById>>(API_UPGRADE_ROLE_PERMISSION,data)
  }
}
