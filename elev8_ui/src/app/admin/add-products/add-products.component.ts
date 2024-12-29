import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  AddProducts: FormGroup;
  selectedCategory: string = '';
  displayedFields: string[] = []; // This will hold the fields to display dynamically

  // Define category-specific fields
  categoryFields: { [key: string]: string[] } = {
    cigar: [
      'productname',
      'description',
      'brand',
      'origin',
      'shape',
      'length',
      'girth',
      'manufacturer',
      'wrapper',
      'binder',
      'filler',
      'price',
      'bprice',
      'qty'
    ],
    vape: ['productname', 'puffs', 'flavour', 'price'],
    humidor: ['productname', 'capacity', 'price'],
    tobacco: ['productname', 'flavour', 'weight', 'price'],
    accessories: ['productname', 'price']
  };

  constructor(private fb: FormBuilder) {
    this.AddProducts = this.fb.group({
      category: [null, [Validators.required]],
      productname: [null],
      description: [null],
      brand: [null],
      origin: [null],
      shape: [null],
      length: [null],
      girth: [null],
      manufacturer: [null],
      wrapper: [null],
      binder: [null],
      filler: [null],
      price: [null],
      bprice: [null],
      qty: [null],
      puffs: [null],
      flavour: [null],
      capacity: [null],
      weight: [null],
    });
  }

  ngOnInit(): void {}

  onCategoryChange(): void {
    this.selectedCategory = this.AddProducts.get('category')?.value;

    // Update the displayed fields dynamically based on the selected category
    this.displayedFields = this.categoryFields[this.selectedCategory] || [];

    // Update validators for the fields
    this.updateValidators();
  }

  updateValidators(): void {
    // Clear all validators
    this.clearValidators();

    // Set validators for the displayed fields
    this.displayedFields.forEach((field) => {
      this.setValidators(field, [Validators.required]);

      // Add additional validators for specific fields
      if (field === 'productname') {
        this.setValidators(field, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
      } else if (field === 'price' || field === 'bprice' || field === 'qty') {
        this.setValidators(field, [Validators.required, Validators.max(2000)]);
      }
    });

    this.AddProducts.updateValueAndValidity();
  }

  setValidators(controlName: string, validators: ValidatorFn[]): void {
    const control = this.AddProducts.get(controlName);
    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  clearValidators(): void {
    Object.keys(this.AddProducts.controls).forEach((key) => {
      const control = this.AddProducts.get(key);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }
}
