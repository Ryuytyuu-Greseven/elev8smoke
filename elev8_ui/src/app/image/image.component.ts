import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  srcUrl = '';

  @Input() imageSrc: string = '';
  @Input() alt = '';
  @Input() class = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (this.imageSrc) {
      this.fetchSrc();
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.imageSrc) {
  //     this.fetchSrc();
  //   }
  // }

  fetchSrc() {
    try {
      this.apiService.fetchSignedUrl(this.imageSrc).subscribe({
        next: (response: any) => {
          console.log('Src Url', response);
          this.srcUrl = response.url;
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
