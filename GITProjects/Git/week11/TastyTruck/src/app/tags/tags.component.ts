import { Component, OnInit } from '@angular/core';
import { Tag } from '../about/category/Tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'] 
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  selectedTag: string | null = null; 

  constructor(public fs: FoodService) {}

  ngOnInit(): void {
    this.tags = this.fs.getAllTag();
  }

  onTagClick(tagName: string) {
    this.selectedTag = tagName; 
  }
}
