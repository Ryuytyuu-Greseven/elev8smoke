import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  AddProducts: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Initializing the FormGroup with validation rules
    this.AddProducts = this.formBuilder.group({
      productname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      brand: [null, [Validators.required]],
      origin: [null, [Validators.required]],
      shape: [null, [Validators.required]],
      length: [null, [Validators.required]],
      girth: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
      wrapper: [null, [Validators.required]],
      binder: [null, [Validators.required]],
      filler: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.max(2000)]],
      bprice: [null, [Validators.required, Validators.max(2000)]],
      qty: [null, [Validators.required, Validators.max(2000)]],
    });
  }

  onSubmit(): void {
    if (this.AddProducts.valid) {
      console.log('Form Submitted Successfully:', this.AddProducts.value);
    } else {
      console.error('Form is invalid. Please check the inputs.');
    }
  }

  resetForm(): void {
    this.AddProducts.reset();
  }
}
