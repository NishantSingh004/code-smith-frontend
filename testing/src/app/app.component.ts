import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './component/topbar/topbar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [TopbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // corrected from styleUrl to styleUrls
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })), // corrected the final opacity to 1
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'testing';

  constructor(private router: Router) {}

  getRouteAnimationState() {
    return this.router.url;
  }
}
