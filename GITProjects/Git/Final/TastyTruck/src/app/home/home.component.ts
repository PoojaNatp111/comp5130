import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule, NgFor } from '@angular/common';
import { Foods } from '../about/category/food';
import { NgxStarsModule } from 'ngx-stars';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule, CommonModule, HttpClientModule, NgxStarsModule, SearchComponent, CommonModule, TagsComponent , RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  foods: Foods[] = [];
  foodItems: any[] = [];
  food!:Foods;
  constructor(public fs: FoodService, public router: ActivatedRoute,private fb: FormBuilder, private http: HttpClient,private foodservice:FoodService, private cartService:CartService,
    private routers:Router) {}

  ngOnInit(): void {
    this.foods = this.fs.getAll(); 
    console.log(this.foods);

    this.router.params.subscribe(params => {
      if (params['searchItem'])
        this.foods = this.fs.getAll().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
       else if(params['tag'])
        this.foods = this.fs.getAllFoodByTag(params['tag'])
       else 
        this.foods = this.fs.getAll();
    });
    this.fetchFoodItems();
  }
  fetchFoodItems(): void {
    this.http.get('http://localhost:9002/get-food-items').subscribe({
      next: (response: any) => {
        console.log('Fetched Food Items:', response);
        this.foodItems = response; // Store fetched items
      },
      error: (error) => {
        console.error('Error fetching food items:', error);
        alert('Error fetching food items.');
      },
    });
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  addFetchedFoodToCart(item: any): void {
    this.routers.navigateByUrl('/cart-page');
  }
  
  
}
