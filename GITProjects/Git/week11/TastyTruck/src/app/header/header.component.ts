import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../about/category/Cart'; 
import { CartItem } from '../about/category/CartItem'; 
import { UserService } from '../services/user.service'

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  username: string | null = '';
  cart: Cart; 
  
  constructor(private cartService: CartService, private router: Router, private userService: UserService) {  
    this.cart = new Cart(); 
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.cart = this.cartService.getCart(); 

    this.userService.username$.subscribe((username) => {
      this.username = username;
    });
  }

  removeFromCart(foodId: number): void {
    this.cartService.removeFromCart(foodId); 
    this.cart = this.cartService.getCart();
  }

  changeQuantity(cartItem: CartItem, quantity: string): void {
    const quantityNumber = Number(quantity); 
    if (quantityNumber > 0) {
      this.cartService.changeQuantity(quantityNumber, cartItem.food.id);
    } else {
      this.removeFromCart(cartItem.food.id); 
    }
    this.cart = this.cartService.getCart(); 
  }
  signOut() {
    localStorage.removeItem('username');
    this.username = null;
    this.router.navigate(['/home']);
      this.userService.clearUsername();
    
  }
  
}
