import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Path } from 'src/models/path.enum';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private UtenteService: UtenteService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let utente = this.UtenteService.getLoggedUser();
    if (utente != null || utente != undefined) {
      return true;
    } else {
      this.router.navigate([Path.Login]);
      return false;
    }
  }
}
