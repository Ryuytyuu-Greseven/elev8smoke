import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  constructor() {}

  @ViewChild('dashImg') imageDiv!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const divPosition = this.imageDiv.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    console.log('Divposition:', divPosition, 'Window Height:', windowHeight);

    // Check if the div is visible in the viewport
    if (divPosition < windowHeight && divPosition > windowHeight / 2) {
      this.imageDiv.nativeElement.classList.add('scale-up');
    } else {
      this.imageDiv.nativeElement.classList.remove('scale-up');
    }
  }
}
