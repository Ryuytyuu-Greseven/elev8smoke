import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
toggleForm() {
throw new Error('Method not implemented.');
}
  AddProducts: FormGroup;
  selectedCategory: string = '';
  displayedFields: string[] = [];
  itemCategory = 'Select Category'; // This will hold the fields to display dynamically

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
editingEnabled: any;
formVisible: any;

  constructor(private fb: FormBuilder, private appService: ApiService) {
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

  onClickCancel() {
    this.AddProducts.reset();
    this.selectedCategory = '';
    this.displayedFields = [];
  }

  onClicksubmit(val:any) {
    console.log('Form submitted:', val);
   let body = {
    category: val.category,
      productname: val.productname,
      description: val.description,
      brand: val.brand,
      origin: val.origin,
      shape: val.shape,
      length: val.length,
      girth: val.girth,
      manufacturer: val.manufacturer,
      wrapper: val.wrapper,
      binder: val.binder,
      filler: val.filler,
      price: val.price,
      bprice: val.bprice,
      qty: val.qty,
      puffs: val.puffs,
      flavour: val.flavour,
      capacity: val.capacity,
      weight: val.weight
    }
    // Make HTTP request to save data to the server
    this.appService.addCigars(body).subscribe({next: (response: any)=> {
      console.log('Data saved successfully', response);
      this.AddProducts.reset();
      this.selectedCategory = '';
    this.displayedFields = [];
    }})
  }
  
}
