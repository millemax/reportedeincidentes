import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';

import{AngularFireAuth} from '@angular/fire/auth'
import{map} from "rxjs/operators"
import { isNullOrUndefined } from 'util';
import { NavController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private AFauth:AngularFireAuth, private nvCtrl:NavController){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       return this.AFauth.authState.pipe(map(auth=>{
          if(isNullOrUndefined(auth)){
            console.log("no estas autenticado");
            this.nvCtrl.navigateForward('/home');

            return false;

          }else{
            return true; 
          }

       // console.log(auth);
        //return false;

      }))

    
  }
 
}
