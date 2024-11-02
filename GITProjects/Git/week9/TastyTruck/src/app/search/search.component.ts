import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] 
})
export class SearchComponent implements OnInit {
  searchItem: string = '';

  constructor(public route: ActivatedRoute, public router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['searchItem'])
      this.searchItem = params['searchItem'] || '';
    });
  }

  search(): void{
    if(this.searchItem){
      this.router.navigateByUrl('/search/' + this.searchItem)
    }
  }
}
