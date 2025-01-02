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

  constructor(private appService: ApiService) {}

  // on file upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
    }
  }

  generateUrl(val: any) {
    if (!this.uploadedFile) {
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
}
