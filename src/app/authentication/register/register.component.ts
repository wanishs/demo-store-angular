import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
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
