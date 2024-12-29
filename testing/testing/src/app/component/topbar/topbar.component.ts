import { Component, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, NgIf],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  public userService = inject(UserService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.userService.user) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.userService.user = JSON.parse(userData);
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  logout() {
    this.ngZone.run(() => {
      this.userService.user = undefined;
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
