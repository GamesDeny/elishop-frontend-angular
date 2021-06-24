import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private UtenteService: UtenteService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.UtenteService.getLoggedUser() != null &&
      this.UtenteService.getLoggedUser() != undefined
    ) {
      return this.UtenteService.checkIfAdmin();
    } else {
      return false;
    }
  }
}
