import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const loginData: Login = { Email: this.email, Password: this.password };
    this.authService.login(loginData).subscribe(
      (asd) => {
        // Successful login
        console.log(asd);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/']); // Navigate to admin page
        } else {
          this.router.navigate(['/']); // Navigate to organizer page
        }
      },
      (error) => {
        if (error.status === 500) {
          this.error = '*Account not found. Please check your email and password.';
        } else {
          this.error = '*Invalid email or password'; // Display error message for other errors
        }
      }
    );
  }
}
