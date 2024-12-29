import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-cigar',
  templateUrl: './view-cigar.component.html',
  styleUrls: ['./view-cigar.component.css'],
})
export class ViewCigarComponent {
  cigar: any;
  itemId: any = '';

  // cigars = [
  //   { id: 123, name: 'Tatiana Classic - Sweet Euphoria', price: 5.99, image: 'assets/images/logo.png', barcode: '788135100115', description: 'German Chocolate, Acai Honey.', inStock: false },
  //   { id: 12, name: 'La Aroma de Cuba Fresh Pack', price: 59.99, image: 'assets/images/logo.png', barcode: '788135100116', description: 'Rich and spicy flavor.', inStock: true },
  //   // Add other cigars here...
  // ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.fetchSingleItem();
    // this.cigar = this.cigars.find((c) => c.id === id);
  }

  // fetching cigars or essentials
  fetchSingleItem() {
    try {
      const body = {
        itemId: this.itemId,
      };

      this.apiService.getSingeItem(body).subscribe({
        next: (response: any) => {
          console.log('All categories fetched', response);
          if (response.success && response.data?.length) {
            this.cigar = response.data[0];
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
