import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  login() {
    if (!this.email || !this.password) {
      console.error('Email or password is missing.');
      this.cd.detectChanges();
      return;
    }

    this.authService.login(this.email, this.password).then((result: any) => {
      console.log('Login successful', result);
      this.router.navigate(['/flight-details']);
    }).catch((error: any) => {
      console.error('Login failed:', error);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logout successful');
      this.router.navigate(['/login']);
      this.cd.detectChanges();
    }).catch((error) => {
      console.log('Logout failed:', error);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
    }
}
