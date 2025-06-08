import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    console.log("RegisterComponent initialized");

    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    
    // Initialize form controls if needed
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Form Submitted", this.registerForm.value);
      this.authenticationService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log("Registration successful", response);
          // route to login or home page
          this.registerForm.reset(); // Reset the form after successful registration
          this.router.navigate(["/login"]); // Navigate to the login page
          // Handle successful registration, e.g., redirect to login or home page
        },
        (error) => {
          console.error("Registration failed", error);
          // Handle registration error, e.g., show an error message
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }
}
