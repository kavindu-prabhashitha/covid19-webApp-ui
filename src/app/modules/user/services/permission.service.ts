import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_GET_ROLE_PERMISSION } from 'src/app/constants';
import { IGetAllPermisions, IPermission } from 'src/app/interfaces';
import { ICommonResponse } from 'src/app/interfaces/CommonResponse.interface';

@Injectable()
export class PermissionService {

  constructor(private http:HttpClient) {

   }

   GetPermissions(){
     return this.http.get<ICommonResponse<IPermission[]>>(API_GET_ROLE_PERMISSION)
   }
}
