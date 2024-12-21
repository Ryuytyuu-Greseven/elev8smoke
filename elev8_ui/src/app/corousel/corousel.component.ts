import { Component } from '@angular/core';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css'],
})
export class CorouselComponent {
  images = [
    { src: 'https://imgs.search.brave.com/UIwXYzJiyQiU6yk8qf2jDkfX4AfKu5Keu97y_0peGFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jbG9zZS11cC1o/YW5kLWhvbGRpbmct/Y2lnYXJfMTA0ODk0/NC0xNDgyMTU3Ny5q/cGc_c2VtdD1haXNf/aHlicmlk', alt: 'Image 1' },
    { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.53tdeXg6AC-9Z7dO1WiwxwAAAA%26pid%3DApi&f=1&ipt=99b27fcebac8a4de7a642aa81f4d453554cf96fcbc00b4337d717a27a71abde9&ipo=images', alt: 'Image 1' },
    { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP._LVsVZFQ4kE7eoP3fz9xJQHaE8%26pid%3DApi&f=1&ipt=2a274c834ae4eb155cecf2a55bc20f01803cd90e7f76d64f6164aaa523ce5b66&ipo=images', alt: 'Image 2' },
    { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MEGVwNgXc2FdKGI9kGcw0gHaE3%26pid%3DApi&f=1&ipt=37091ee4bfcca72014dbf56eb772e414a906a7665c3aee309675f3c4ec2044f2&ipo=images', alt: 'Image 3' },
    { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ReZ2uPsFRi9fs6Nas2H5kAHaD6%26pid%3DApi&f=1&ipt=27b2b26abc153524a45cb24f019dc4b5a85e1d6e5656557046d9a7bcd653cb80&ipo=images', alt: 'Image 4' },
  ];

  ngOnInit(): void {
    // Auto-scroll every 3 seconds
    setInterval(() => {
      const carousel = document.getElementById('imageCarousel') as any;
      const nextButton = carousel.querySelector('.carousel-control-next');
      nextButton.click();
    }, 3000); // 3 seconds interval
  }
}
