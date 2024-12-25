import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './component/topbar/topbar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [TopbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'testing';

  constructor(private router: Router) {}

  // Method to get the current route URL
  getRouteAnimationState() {
    return this.router.url;
  }
}
