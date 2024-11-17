import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule, NgFor } from '@angular/common';
import { Foods } from '../about/category/food';
import { NgxStarsModule } from 'ngx-stars';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgxStarsModule, SearchComponent, CommonModule, TagsComponent , RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  foods: Foods[] = [];
  constructor(public fs: FoodService, public router: ActivatedRoute) {}

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
  }
}
