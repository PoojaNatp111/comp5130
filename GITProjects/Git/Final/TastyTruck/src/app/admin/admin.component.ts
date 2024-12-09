import { Component } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  username: string = '';
  password: string = '';
  isAdminLoggedIn: boolean = false;

  constructor(private adminAuthService: AdminAuthService, private router: Router) {}

  onSubmit() {
    if (this.adminAuthService.validateAdmin(this.username, this.password)) {
      this.isAdminLoggedIn = true;
      alert('Admin Login successful!');
      this.router.navigate(['/admin-main']); 
    } else {
      alert('Invalid credentials');
    }
  }


}
