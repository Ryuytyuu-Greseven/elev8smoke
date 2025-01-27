import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css'],
})
export class PromotionsListComponent {
  presignedUrl: any = '';
  uploadedFile: any = '';
  imageUrl: any = '';

  promotionSources: any[] = [];

  constructor(private apiService: ApiService) {
    this.fetchPromotions();
  }

  // on file upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
    }
  }

  generateUrl() {
    if (!this.uploadedFile) {
      return;
    }

    const body = {
      fileName: this.uploadedFile.name,
      fileType: this.uploadedFile.type,
    };

    // console.log(this.uploadedFile);
    try {
      this.apiService.addPromotions(body).subscribe((response: any) => {
        console.log(response);
        if (response?.success) {
          this.presignedUrl = response.url;
          this.imageUrl = response.newFileName;

          // Uploading the file to s3
          this.apiService
            .uploadFileToS3(this.presignedUrl, this.uploadedFile!)
            .subscribe({
              next: () => {
                this.uploadedFile = '';
                this.fetchPromotions();
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

  // fetching cigars or essentials
  fetchPromotions() {
    try {
      this.apiService.getPromotions().subscribe({
        next: (response: any) => {
          console.log('All promotions fetched', response);
          if (response.success && response.data?.length) {
            this.promotionSources = response.data;
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

  onDelete(val: any){
    console.log(val, 'value delete')
    try {
      this.apiService.deletePromotion({itemId: val._id}).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.fetchPromotions();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
