import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthWeb3Service } from 'src/app/services/auth/auth-web3.service';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authWeb3Service: AuthWeb3Service, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if (!this.authWeb3Service.verifyAccessToken()){
      
        this.router.navigate(['./login']);
        return false;
      } 
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
 
    var isVerified = this.authWeb3Service.verifyAccessToken();

    if(!isVerified){
      this.router.navigate(['./login']);
      return false;
    }

    return true;
      
  }
}
