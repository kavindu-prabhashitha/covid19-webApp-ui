import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../interfaces/User.interface";
import { UserRole } from "../constants/UserRoles.enum";

@Injectable()
export class UserService{
    readonly #currentUser$ = new BehaviorSubject<User>({userName:"Anonymus",role:UserRole.ANONYMOUS});
    private _roles:UserRole[] = [UserRole.ADMINISTRATOR,UserRole.USER,UserRole.ANONYMOUS];
    private _roleMap = new Map();

    constructor(){
        this._roleMap.set(UserRole.ADMINISTRATOR,[UserRole.ADMINISTRATOR,UserRole.USER,UserRole.ANONYMOUS]);
        this._roleMap.set(UserRole.USER,[UserRole.USER,UserRole.ANONYMOUS])
        this._roleMap.set(UserRole.ANONYMOUS,[UserRole.ANONYMOUS])

        console.log(this._roleMap)
    }
  
    getCurrentUser(){
        console.log("Current User Name: ",this.#currentUser$.value)
        return this.#currentUser$;
    }

    setCurrentUser = (user:User) : void=>{
        this.#currentUser$.next(user)
    }

    isGranted(roleOrPermission:string, user?:User){
        if (!user) {
            user = this.#currentUser$.value;
          }
      
          if (!user) {
            return false;
          }

          if (!this._roles.includes(user.role)) {
            return false;
          }

          return this._roleMap.get(this.#currentUser$.value.role).includes(roleOrPermission)
    }
}