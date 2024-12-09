import { Component } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-adminmainpage',
  standalone: true,
  imports: [],
  templateUrl: './adminmainpage.component.html',
  styleUrl: './adminmainpage.component.css'
})
export class AdminmainpageComponent {

  constructor(private router: Router) {}

  navigateToAddItem() {
    this.router.navigate(['/add-food']); 
  }

  navigateToDeleteItem() {
    this.router.navigate(['/delete-item']); 
  }

  navigateToOrders() {
    this.router.navigate(['/orders']); 
  }
}
  
