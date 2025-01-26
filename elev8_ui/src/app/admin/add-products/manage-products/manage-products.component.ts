import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  @Output() editIt = new EventEmitter<Object>();
  constructor(private apiService: ApiService,public router:Router) {}
  
  ngOnInit(): void {
    this.fetchItems({ category: this.itemCategory });
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
        cigar.productname.toLowerCase().includes(this.searchQuery.toLowerCase())
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

  
  onclick() {
    this.fetchItems({category: this.itemCategory});
  }

  filterCategory() {
    // this.fetchItems({ category: this.itemCategory });
    let result = [...this.ogItems];

    result = result.filter(
      (cigar) =>
        cigar.category.toLowerCase() === this.itemCategory.toLowerCase()
    );

    console.log(this.itemCategory, result);
    this.filteredCigars = result;
  }
  fetchItems(body: any) {
    try {
      console.log('Body:', body);
      this.apiService.getItems(body).subscribe({
        next: (response: any) => {
          console.log('All categories fetched', response);
          if (response.success) {
            console.log('All categories fetched', response);
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

  onEditItem(item: any) {
    console.log('Item1:', item);
    this.apiService.setProduct(item)
    // this.editIt.emit(item);
    this.router.navigate(['admin/addprod'])
    console.log('Item:', item);
  }
  deleteItem(itemId: any) {
    console.log('Item ID:', itemId);
  }


}
