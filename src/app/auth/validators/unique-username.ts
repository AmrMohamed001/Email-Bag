import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.http
      .post('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        map((value) => {
          return null;
        }),
        catchError((err) => {
          if (err.error.username) return of({ nonUniqueUsername: true });
          else return of({ noConnection: true });
        })
      );
  };
}
