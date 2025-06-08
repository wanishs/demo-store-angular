import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Successful', this.loginForm.value);
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          if (response.token) {
            localStorage.setItem('token', response.token); // Store token in local storage
            this.router.navigate(['/product']); // Navigate to home page after successful login
          }
          // Handle successful login, e.g., redirect to home page or dashboard
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login error, e.g., show an error message
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
