import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  activeConfig = 'promotions';

  constructor(private route: Router) {}

  onConfigClick(config: string) {
    this.activeConfig = config;

    if (this.activeConfig !== 'promotions') {
      // this.route.navigate([`/admin/${this.activeConfig}`]);
    }
  }
}
