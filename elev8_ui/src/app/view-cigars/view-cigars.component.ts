import { Component } from '@angular/core';

@Component({
  selector: 'app-view-cigars',
  templateUrl: './view-cigars.component.html',
  styleUrls: ['./view-cigars.component.css']
})
export class ViewCigarsComponent {
  cigars = [
    { id: 123,name: 'Tatiana Classic - Sweet Euphoria', price: 5.99, image: 'assets/images/logo.png', views: 500 },
    { id: 123,name: 'La Aroma de Cuba Fresh Pack', price: 59.99, image: 'assets/images/logo.png', views: 700 },
    { id: 123,name: 'Bolivar Robusto', price: 9.99, image: 'assets/images/logo.png', views: 300 },
    { id: 123,name: 'Juicy Lucy', price: 45.99, image: 'assets/images/logo.png', views: 400 },
    { id: 123,name: 'Undercrown Maduro', price: 69.99, image: 'assets/images/logo.png', views: 600 },
    { id: 123,name: 'Treasure Box', price: 120.99, image: 'assets/images/logo.png', views: 800 }
  ];
  searchQuery: string = '';
  sortBy: string = 'mostViewed';
  filteredCigars = [...this.cigars];

  filterCigars() {
    let result = this.cigars;

    // Search filter
    if (this.searchQuery) {
      result = result.filter(cigar =>
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
  logoutput(item:any) {
    console.log(item);
  }
}
