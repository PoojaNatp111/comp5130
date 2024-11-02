import { Component, OnInit } from '@angular/core';
import { Foods } from '../about/category/food';
import { ActivatedRoute, Route } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-foodpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css'
})
export class FoodpageComponent implements OnInit{
food!:Foods;
  constructor(private activatedRoute:ActivatedRoute,
    private foodservice:FoodService, private cartService:CartService,
     private router:Router){
      activatedRoute.params.subscribe((params)=>{
        if(params['id'])
          this.food = foodservice.getFoodById(params['id'])
      })
    }

  ngOnInit(): void {
      
  }
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }

}
