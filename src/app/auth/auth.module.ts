import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignoutComponent } from './signout/signout.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SignupComponent, SigninComponent, SignoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule,NgxSpinnerModule, SharedModule],
})
export class AuthModule {}
