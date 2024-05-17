import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, map, startWith } from "rxjs";
import { User } from "../interfaces/User.interface";
import { UserRole } from "../constants/UserRoles.enum";

@Injectable()
export class UserService{
    readonly #currentUser$ = new BehaviorSubject<User>({userName:"Anonymus",role:UserRole.ANONIMUS});
  

    getCurrentUser =() : Observable<User>=>{
        return this.#currentUser$.asObservable();
    }

    getCurrentUserV2(){
        console.log("Current User Name: ",this.#currentUser$.value)
        return this.#currentUser$;
    }

    setCurrentUser = (user:User) : void=>{
        this.#currentUser$.next(user)
    }
}