import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cigar',
  templateUrl: './view-cigar.component.html',
  styleUrls: ['./view-cigar.component.css']
})
export class ViewCigarComponent {
  cigar: any;

  cigars = [
    { id: 123, name: 'Tatiana Classic - Sweet Euphoria', price: 5.99, image: 'assets/images/logo.png', barcode: '788135100115', description: 'German Chocolate, Acai Honey.', inStock: false },
    { id: 12, name: 'La Aroma de Cuba Fresh Pack', price: 59.99, image: 'assets/images/logo.png', barcode: '788135100116', description: 'Rich and spicy flavor.', inStock: true },
    // Add other cigars here...
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cigar = this.cigars.find(c => c.id === id);
  }
}
