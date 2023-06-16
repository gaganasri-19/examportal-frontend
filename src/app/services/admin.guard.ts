import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
     
    if (this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN'){
      return true
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}






// export const adminGuard: CanActivateFn = (route, state) => {
//   constructor(private login:LoginService){
    
//   }
//   return true;
// };
