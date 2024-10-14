import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.signedIn$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((authenticated) => {
        if (!authenticated) this.router.navigateByUrl('/');
      })
    );
  }
}
