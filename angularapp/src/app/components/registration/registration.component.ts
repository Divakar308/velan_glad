// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'src/app/models/user.model';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent implements OnInit {

//   registrationForm!: FormGroup;
//   username: string = "";
//   password: string = "";
//   errorMessage: string;
//   confirmPassword: string = "";
//   mobileNumber: string = "";
//   userRole: string = "";
//   email: string = "";
//   passwordMismatch: boolean = false; // New property to track password mismatch

//   constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

//   }
//   ngOnInit() {
//     this.registrationForm = this.fb.group({
//       mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }
//   register(): void {
//     if (this.password !== this.confirmPassword) {
//       this.passwordMismatch = true;
//       return;
//     }

//     this.passwordMismatch = false;

//     if (!this.isPasswordComplex(this.password)) {
//       return; // Password complexity check failed
//     }

//     const user: User = {
//       Username: this.username,
//       Password: this.password,
//       UserRole: this.userRole,
//       Email: this.email,
//       MobileNumber: this.mobileNumber
//     }


// this.authService.register(user).subscribe(
//   (response) => {
//     console.log(response);
//     if (response && response.Status === 'Success') {
//       this.router.navigate(['/login']);
//     } else if (response && response.error && response.error.Message) {
//       this.errorMessage = response.error.Message;
//     }
//   },
//   (error) => {
//     console.log(error);
//     if (error.error && error.error.Message) {
//       this.errorMessage = error.error.Message;
//     }
//   }
// );

//   }

//   isPasswordComplex(password: string): boolean {
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasDigit = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

//     return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  username: string = "";
  password: string = "";
  errorMessage: string;
  confirmPassword: string = "";
  mobileNumber: string = "";
  userRole: string = "";
  email: string = "";
  secretKey: string = ""; // Store the entered secret key
  passwordMismatch: boolean = false;
  secretKeyMismatch: boolean = false; // Track secret key mismatch
  predefinedSecretKey: string = '987'; // The static secret key

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    if (!this.isPasswordComplex(this.password)) {
      return; // Password complexity check failed
    }

    // If the role is Admin, check the secret key
    if (this.userRole === 'Admin' && this.secretKey !== this.predefinedSecretKey) {
      this.secretKeyMismatch = true;
      return;
    }

    this.secretKeyMismatch = false;

    const user: User = {
      Username: this.username,
      Password: this.password,
      UserRole: this.userRole,
      Email: this.email,
      MobileNumber: this.mobileNumber
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        if (response && response.Status === 'Success') {
          this.router.navigate(['/login']);
        } else if (response && response.error && response.error.Message) {
          this.errorMessage = response.error.Message;
        }
      },
      (error) => {
        console.log(error);
        if (error.error && error.error.Message) {
          this.errorMessage = error.error.Message;
        }
      }
    );
  }

  isPasswordComplex(password: string): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  }
}

