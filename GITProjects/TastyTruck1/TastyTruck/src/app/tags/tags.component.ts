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
  styleUrls: ['./tags.component.css'] // Corrected from styleUrl to styleUrls
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  selectedTag: string | null = null; // To track the selected tag

  constructor(public fs: FoodService) {}

  ngOnInit(): void {
    this.tags = this.fs.getAllTag();
  }

  onTagClick(tagName: string) {
    this.selectedTag = tagName; // Update the selected tag on click
  }
}
