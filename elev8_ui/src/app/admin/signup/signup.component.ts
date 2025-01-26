import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    if (this.apiService.signinStatus) {
      this.router.navigate(['/admin/config']);
    }
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      console.log('Invalid form', this.signupForm);
      this.errorMessage = 'Invalid credentials';
      return;
    }

    // console.log(this.uploadedFile);
    try {
      const body = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
      };

      this.apiService.singInUser(body).subscribe((response: any) => {
        console.log(response);
        if (response?.success) {
          sessionStorage.setItem('elev8@user', body.username);
          this.router.navigate(['/admin/config']);
          this.apiService.userSignin.next(true);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      });
    } catch (error) {
      console.log(error);
    }

    console.log(this.signupForm.value);
  }
}
