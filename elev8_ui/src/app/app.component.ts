import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'elev8_ui';

  preloaderEnabled = true;

  @ViewChild('preloaderVideo')
  preloaderVideo!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById('video-preloader')?.remove();
      this.preloaderEnabled = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    // if (this.preloaderVideo?.nativeElement) {
    const video = this.preloaderVideo.nativeElement;

    // Ensure video is muted and attempt autoplay
    video.muted = true;
    video.play().catch((err) => {
      console.warn('Autoplay failed, starting manually:', err);

      // Fallback: Play on user gesture
      document.addEventListener(
        'click',
        () => {
          video.play();
        },
        { once: true } // Ensure listener is only added once
      );
    });
    // }
  }
}
