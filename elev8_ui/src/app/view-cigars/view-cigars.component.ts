import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-cigars',
  templateUrl: './view-cigars.component.html',
  styleUrls: ['./view-cigars.component.css'],
})
export class ViewCigarsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchItems();
  }

  searchQuery: string = '';
  sortBy: string = 'mostViewed';
  filteredCigars: any[] = [];
  itemCategory = 'cigar';

  ogItems: any[] = [];

  filterCigars() {
    let result = [...this.ogItems];

    // Search filter
    if (this.searchQuery) {
      result = result.filter((cigar) =>
        cigar.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (this.sortBy === 'priceLowHigh') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceHighLow') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'mostViewed') {
      result = result.sort((a, b) => b.views - a.views);
    }

    this.filteredCigars = result;
  }

  filterCategory() {
    let result = [...this.ogItems];

    result = result.filter(
      (cigar) =>
        cigar.category.toLowerCase() === this.itemCategory.toLowerCase()
    );

    console.log(this.itemCategory, result);
    this.filteredCigars = result;
  }

  logoutput(item: any) {
    console.log(item);
  }

  // fetching cigars or essentials
  fetchItems() {
    try {
      this.apiService.getItems().subscribe({
        next: (response: any) => {
          console.log('All categories fetched', response);
          if (response.success) {
            this.ogItems = response.data;
            this.filterCategory();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
