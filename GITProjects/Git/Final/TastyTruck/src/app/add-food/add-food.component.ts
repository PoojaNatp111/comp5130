import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  addFoodForm!: FormGroup;
  foodItems: any[] = []; // Array to store fetched food items

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the form with required fields and validators
    this.addFoodForm = this.fb.group({
      itemName: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      price: ['', [Validators.required, Validators.min(1)]],
      timeToPrepare: ['', Validators.required],
      cuisine: ['', Validators.required], // Comma-separated cuisine names
    });

    // Fetch existing food items on initialization
    this.fetchFoodItems();
  }

  onSubmit(): void {
    if (this.addFoodForm.valid) {
      const bodyData = {
        itemName: this.addFoodForm.value.itemName,
        rating: this.addFoodForm.value.rating,
        price: this.addFoodForm.value.price,
        timeToPrepare: this.addFoodForm.value.timeToPrepare,
        cuisine: this.addFoodForm.value.cuisine.split(','), // Split into an array
      };

      this.http.post('http://localhost:9002/add-food-item', bodyData).subscribe({
        next: (response: any) => {
          console.log(response);
          alert('Food item added successfully');
          this.addFoodForm.reset();
          this.fetchFoodItems(); // Refresh the list after adding
        },
        error: (error) => {
          console.error(error);
          alert('Error adding food item. Please try again.');
        },
      });
    } else {
      this.addFoodForm.markAllAsTouched();
    }
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
}
