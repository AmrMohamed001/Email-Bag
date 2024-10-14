import { AuthService } from './../../auth.service';
import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { SignupUser } from '../signup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('submitBtn', { static: true }) submitBtn: ElementRef;
  signupForm = new FormGroup(
    {
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        asyncValidators: [this.uniqueUsernameValidator.validate],
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPasswordValidator.validate],
    }
  );

  constructor(
    private matchPasswordValidator: MatchPassword,
    private uniqueUsernameValidator: UniqueUsername,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.checkIsSigned().subscribe();
  }

  get username() {
    return this.signupForm.get('username');
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.disableButtons();
    this.authService.signup(this.signupForm.value as SignupUser).subscribe({
      next: (res) => {
        this.enableButtons();
        console.log(res);
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        console.log(err);
        if (!err.status) this.signupForm.setErrors({ noConnection: true });
      },
    });
  }

  disableButtons() {
    this.renderer.setAttribute(
      this.submitBtn.nativeElement,
      'disabled',
      'true'
    );
  }

  enableButtons() {
    this.renderer.removeAttribute(this.submitBtn.nativeElement, 'disabled');
  }
}
