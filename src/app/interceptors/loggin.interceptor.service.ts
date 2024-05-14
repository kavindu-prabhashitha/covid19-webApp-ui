import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LogginInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService, private router:Router){
        
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if(!this.authService.userSub.value.data){
        //     this.router.navigate(['/login'])
        // }
        return next.handle(req)
    }

}