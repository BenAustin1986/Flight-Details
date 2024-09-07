import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  template: `

    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required
          class="form-control" placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required
          class="form-control" placeholder="Enter your password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    `]
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
