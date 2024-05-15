import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject} from "@angular/core"

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const protectedRoutes:string[]=["/import-case"]

  const accessToken = localStorage.getItem("accessToken")

  return protectedRoutes.includes(state.url) && !accessToken 
        ? router.navigate(["/login"]) 
        : true
};
