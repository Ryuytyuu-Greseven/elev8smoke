import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-cigar',
  templateUrl: './single-cigar.component.html',
  styleUrls: ['./single-cigar.component.css'],
})
export class SingleCigarComponent {
  @Input() cigarDetails: any = {};
}
