import { Component } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-orderslist',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './orderslist.component.html',
  styleUrl: './orderslist.component.css'
})
export class OrderslistComponent {
  orders: any[] = []; // Store fetched orders

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get('http://localhost:9002/get-orders').subscribe({
      next: (response: any) => {
        this.orders = response;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        alert('Unable to fetch orders. Please try again later.');
      }
    });
  }
}