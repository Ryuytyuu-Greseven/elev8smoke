import {
  Component,
  ElementRef,
  enableProdMode,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environement';

if (environment.production) {
  enableProdMode();

  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'elev8_ui';

  preloaderEnabled = true;
  showModal = false;

  @ViewChild('preloaderVideo')
  preloaderVideo!: ElementRef<HTMLVideoElement>;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById('video-preloader')?.remove();
      this.preloaderEnabled = false;
      this.showModal= true;
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


  // write a modal closing function logic in ts file
  verifyAge(value:boolean){
    if(value){
      this.showModal = false;
    } else {
      window.location.href = 'https://www.google.com';
    }
  }
}
