import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css'],
})
export class CorouselComponent implements OnInit, AfterViewInit {
  // images = [
  //   { src: 'https://imgs.search.brave.com/UIwXYzJiyQiU6yk8qf2jDkfX4AfKu5Keu97y_0peGFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jbG9zZS11cC1o/YW5kLWhvbGRpbmct/Y2lnYXJfMTA0ODk0/NC0xNDgyMTU3Ny5q/cGc_c2VtdD1haXNf/aHlicmlk', alt: 'Image 1' },
  //   { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.53tdeXg6AC-9Z7dO1WiwxwAAAA%26pid%3DApi&f=1&ipt=99b27fcebac8a4de7a642aa81f4d453554cf96fcbc00b4337d717a27a71abde9&ipo=images', alt: 'Image 2' },
  //   { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP._LVsVZFQ4kE7eoP3fz9xJQHaE8%26pid%3DApi&f=1&ipt=2a274c834ae4eb155cecf2a55bc20f01803cd90e7f76d64f6164aaa523ce5b66&ipo=images', alt: 'Image 3' },
  //   { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MEGVwNgXc2FdKGI9kGcw0gHaE3%26pid%3DApi&f=1&ipt=37091ee4bfcca72014dbf56eb772e414a906a7665c3aee309675f3c4ec2044f2&ipo=images', alt: 'Image 4' },
  // ];

  images: any[] = [];

  @ViewChild('imageCarousel') carousel!: ElementRef;

  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPromotions().subscribe((response: any) => {
      console.log(response);
      if (response.success && response.data?.length) {
        this.images = response.data;
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.router.url, 'url');

    // Ensure the auto-scroll happens only on the home route
    if (this.router.url === '/') {
      setInterval(() => {
        const nextButton = this.carousel?.nativeElement?.querySelector(
          '.carousel-control-next'
        );
        if (nextButton) {
          // nextButton.click();
        }
      }, 3000); // 3 seconds interval
    }
  }
}
