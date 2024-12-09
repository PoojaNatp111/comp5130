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
  selector: 'app-removeitem',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule, CommonModule, HttpClientModule, NgxStarsModule, CommonModule , RouterModule],
  templateUrl: './removeitem.component.html',
  styleUrl: './removeitem.component.css'
})
export class RemoveitemComponent {
  foodItems: any[] = []; // Array to hold food items

  ngOnInit() {
    this.loadFoodItems(); // Load food items on component initialization
  }

  // Load food items from the server
  loadFoodItems() {
    fetch('http://localhost:9002/get-food-items')
      .then((response) => response.json())
      .then((data) => {
        this.foodItems = data;
      })
      .catch((error) => {
        console.error('Error loading food items:', error);
      });
  }
  generateRandomColor(): string {
    const colors = ['#FFD700', '#FF6347', '#ADFF2F', '#87CEEB', '#DDA0DD'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  removeItem(item: any) {
    if (confirm(`Are you sure you want to remove "${item.itemName}"?`)) {
      fetch(`http://localhost:9002/delete-food-item/${item._id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .then((data) => {
          console.log('Item removed from DB:', data);
          this.foodItems = this.foodItems.filter((food) => food._id !== item._id);
          alert(`"${item.itemName}" has been removed.`);
        })
        .catch((error) => {
          console.error('Error removing item from DB:', error);
          alert('Failed to remove the item. Please try again.');
        });
    }
  }
  
}