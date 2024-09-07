import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('SignupComponent loaded');
  }


  signup() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email or password is missing.';
      return;
    }

    this.authService.signup(this.email, this.password)
      .then((result: any) => {
        this.successMessage = 'Signup successful! You can now log in.';
        console.log('Signup successful', result);
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        this.errorMessage = error.message || 'Signup failed. Please try again.';
        console.error('Signup failed:', error);
      });

    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
