import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signedIn = false;
  constructor(private authService: AuthService) {
    this.authService.signedIn$.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
  }
  ngOnInit(): void {
    this.authService.checkIsSigned().subscribe((res) => {
      this.signedIn = res.authenticated;
    });
  }
}
