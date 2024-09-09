import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (!this.email || !this.password) {
      console.error('Email or password is missing.');
      return;
    }

    this.authService.login(this.email, this.password).then((result) => {
      console.log('Login successful', result);
      this.router.navigate(['/flight-details']);
    }).catch((error: any) => {
      console.error('Login failed:', error);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  }
}
