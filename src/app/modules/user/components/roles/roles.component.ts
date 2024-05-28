import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { IRole } from 'src/app/interfaces/Roles.interface';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  isLoading = false;
  roles:IRole[] = []

  constructor(
    private roleService:RoleService
  ){

  }

  ngOnInit(): void {
    this.roleService.GetRoles().subscribe({
      next: (res)=>{
        this.roles = res.data
        console.log(res)
      }
    })
  }

}
