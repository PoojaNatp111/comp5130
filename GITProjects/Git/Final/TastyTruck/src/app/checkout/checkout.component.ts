import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Cart } from '../about/category/Cart';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule, HttpClientModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cart: Cart;
    user = {
      name: '',
      address: '',
      phone: '',
      shippingMethod: 'standard'
    };
  
    constructor(
      private http: HttpClient,
      private cartService: CartService,
      private router: Router,
      private cdr: ChangeDetectorRef // ChangeDetectorRef to resolve ExpressionChanged error
    ) {
      this.cart = new Cart();
    }
  
    ngOnInit(): void {
      this.cart = this.cartService.getCart();
    }
  
    confirmOrder(): void {
      if (this.cart.totalPrice > 0) {
        const orderDetails = {
          totalPrice: this.cart.totalPrice,
          totalItems: this.cart.items.length,
          user: this.user,
        };
  
        this.http.post('http://localhost:9002/create-order', orderDetails).subscribe({
          next: (response) => {
            console.log('Order response:', response);
            alert(`Order confirmed! Total: $${this.cart.totalPrice}`);
            this.cdr.detectChanges(); 
            this.router.navigate(['/payment']);
          },
          error: (err) => {
            console.error('Error confirming order:', err);
            alert('There was an error processing your order. Please try again.');
          }
        });
      }
    }
  }