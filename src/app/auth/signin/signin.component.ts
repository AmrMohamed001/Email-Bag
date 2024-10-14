import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.authService.checkIsSigned().subscribe();
  }
  @ViewChild('submitBtn', { static: true }) submitBtn: ElementRef;
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }
    this.authService.signIn(this.signinForm.value).subscribe({
      next: (res) => {
        this.spinner.show();
        setTimeout(() => {
          this.enableButtons();
          this.showSuccess('Authenticated', 'Welcome Back!');
          this.router.navigateByUrl('/inbox');
          this.spinner.hide();
        }, 1000);
      },
      error: (err) => {
        this.signinForm.setErrors({ authenticated: true });
        this.showError(
          'Wrong password',
          'Verify your password and try again !'
        );
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

  showSuccess(title: string, text: string) {
    this.toastr.success(text, title, { timeOut: 1500 });
  }

  showError(title: string, text: string) {
    this.toastr.error(text, title, { timeOut: 1500 });
  }
}
