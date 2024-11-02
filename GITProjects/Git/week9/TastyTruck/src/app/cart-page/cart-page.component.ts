import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../about/category/Cart'; 
import { CartItem } from '../about/category/CartItem'; 
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: Cart; 

  constructor(private cartService: CartService) {  
    this.cart = new Cart(); 
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart(); 
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
}
