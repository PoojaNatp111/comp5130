import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
    });
  }

  submit() {
    if (this.forgetForm.valid) {
      const email = this.forgetForm.value.email;
      this.http.post('http://localhost:9002/users/forgot-password', { email }, { observe: 'response', responseType: 'text' }) // Set responseType to 'text'
        .subscribe(
          (response) => {
            if (response.status === 200) {
              alert('Email sent successfully. Please check your inbox for the password reset link.');
              this.router.navigateByUrl('/login');
            }
          },
          (error) => {
            console.error('Error sending password reset link:', error);
            alert('Failed to send password reset link. Please try again.');
          }
        );
    }
  }
}