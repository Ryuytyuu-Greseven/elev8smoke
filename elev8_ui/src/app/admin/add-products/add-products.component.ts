import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
// import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  selectedProduct: any;
  // sub!: Subscription;
  toggleForm() {
    throw new Error('Method not implemented.');
  }
  AddProducts: FormGroup;
  selectedCategory: string = '';
  displayedFields: string[] = [];
  itemCategory = 'Select Category'; // This will hold the fields to display dynamically

  presignedUrl: any = '';
  uploadedFile: any = '';
  imageUrl: any = '';

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
      'qty',
    ],
    vape: ['productname', 'puffs', 'flavour', 'price'],
    humidor: ['productname', 'capacity', 'price'],
    tobacco: ['productname', 'flavour', 'weight', 'price'],
    hookah: ['productname', 'flavour', 'weight', 'price'],
    accessories: ['productname', 'price'],
  };
  editingEnabled: any = false;
  formVisible: any;

  constructor(private fb: FormBuilder, private appService: ApiService, private location: Location) {
    this.AddProducts = this.fb.group({
      category: [{value:null,disabled: this.editingEnabled}, Validators.required],
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

  ngOnInit(): void {
    this.AddProducts.reset();
    if (this.appService.currentProduct.category) {
      this.itemCategory = this.appService.currentProduct.category;
    if (this.itemCategory != null && this.itemCategory != 'null' && this.itemCategory != 'Select Category') {
      this.editingEnabled = true;
      this.toggleFields();
      console.log(this.itemCategory, 'itemCategory');
      this.AddProducts.patchValue(this.appService.currentProduct);
    this.onCategoryChange();
      }
    }
    // this.sub = this.appService.productData.subscribe((product) => {
    //   console.log(product, 'Add Product');

    //   // this.AddProducts.patchValue(product);
    //   // this.onCategoryChange();
    //   // this.editingEnabled = true;
    //   console.log(product, 'product');
    // });
  }

  toggleFields() {
    if (this.editingEnabled) {
      this.AddProducts.controls['category'].disable();
    } else {
      this.AddProducts.controls['category'].enable();
    }
  }

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
        this.setValidators(field, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]);
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
    this.editingEnabled = false;
    this.toggleFields();
    this.location.back();
  }

  onClicksubmit(val: any) {
    console.log('Form submitted:', val,this.appService.currentProduct);
    let body = {}
    if (!this.editingEnabled) {
    body = {
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
      weight: val.weight,

      imageUrl: this.imageUrl ?? '',
    };
  } else {
    body = {
      itemId: this.appService.currentProduct._id,
      category: val.category ? val.category : this.appService.currentProduct.category,
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
      weight: val.weight,

      imageUrl: this.imageUrl ? this.imageUrl : this.appService.currentProduct.imageUrl ? this.appService.currentProduct.imageUrl: '',
    };
  }

  console.log(body , 'body');
    // Make HTTP request to save data to the server
    this.appService.addCigars(body).subscribe({
      next: (response: any) => {
        console.log('Data saved successfully', response);
        this.AddProducts.reset();
        this.selectedCategory = '';
        this.editingEnabled = false;
        this.displayedFields = [];
        this.imageUrl = '';
        this.uploadedFile = '';
        this.presignedUrl = '';
      },
    });
  }

  // on file upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
    }
  }

  generateUrl(val: any) {
    if (!this.uploadedFile) {
      this.onClicksubmit(val);
      return;
    }

    const body = {
      fileName: this.uploadedFile.name,
      fileType: this.uploadedFile.type,
    };
    // console.log(this.uploadedFile);
    try {
      this.appService.getPresignedUrl(body).subscribe((response: any) => {
        console.log(response);
        if (response?.success) {
          this.presignedUrl = response.url;
          this.imageUrl = response.newFileName;

          // Uploading the file to s3
          this.appService
            .uploadFileToS3(this.presignedUrl, this.uploadedFile!)
            .subscribe({
              next: () => {
                this.uploadedFile = '';
                this.onClicksubmit(val);
              },
              error: (err) => {
                console.error('Failed to upload file:', err);
              },
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  onEditItem(item: any) {
    // console.log(item, 'Edit item');
    this.editingEnabled = true;
    this.formVisible = true;
    this.AddProducts.patchValue(item);
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
