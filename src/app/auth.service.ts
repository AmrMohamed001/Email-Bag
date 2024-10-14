import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupUser } from './auth/signup';
import { BehaviorSubject, tap } from 'rxjs';

interface isSignedInUser {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signedIn$ = new BehaviorSubject(null);

  signup(credentials: SignupUser) {
    return this.http
      .post('https://api.angular-email.com/auth/signup', credentials)
      .pipe(tap(() => this.signedIn$.next(true)));
  }

  checkIsSigned() {
    return this.http
      .get<isSignedInUser>('https://api.angular-email.com/auth/signedin')
      .pipe(tap(({ authenticated }) => this.signedIn$.next(authenticated)));
  }
  signOut() {
    return this.http
      .post('https://api.angular-email.com/auth/signout', {})
      .pipe(tap(() => this.signedIn$.next(false)));
  }

  signIn(credentials: any) {
    return this.http
      .post('https://api.angular-email.com/auth/signin', credentials)
      .pipe(tap(() => this.signedIn$.next(true)));
  }
}
