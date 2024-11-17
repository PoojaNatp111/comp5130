import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Cart } from '../about/category/Cart';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
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

    constructor(private cartService: CartService, private router: Router) {
      this.cart = new Cart();
  }

    ngOnInit(): void {
        this.cart = this.cartService.getCart();
    }

    confirmOrder(): void {
      if (this.cart.totalPrice > 0) {
          alert(`Order confirmed! Total: $${this.cart.totalPrice}`);
          this.router.navigate(['/payment']); 
      }
  }
  
}
