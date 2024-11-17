import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  errorMessage: string = '';
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  login(): void {
    let email: string = String(this.loginForm.value.email);
    let emailTrim = email;
    if (email.endsWith('@gmail.com!')) {
      emailTrim = email.replace('@gmail.com!', ''); 
      console.log('Trimmed email:', emailTrim); 
    }

    if (this.loginForm.valid) {
      const bodyData = {
        email: email,
        password: this.loginForm.value.password,
      };

      this.http.post("http://localhost:9002/users/login", bodyData, { observe: 'response' })
        .subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              alert('Successfully logged in!');
              this.router.navigateByUrl('/Home');
              this.userService.setUsername(emailTrim); 
            } else {
              this.errorMessage = 'Incorrect Email or Password';
            }
          },
          (error) => {
            this.errorMessage = 'Incorrect Email or Password';
            console.log('Error during login', error);
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  forgotPassword(): void {
    // Navigate to the Forgot Password page or trigger password reset logic
    this.router.navigateByUrl('/forgot-password');
  }
}
