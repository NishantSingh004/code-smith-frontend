import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if (this.loginForm.invalid) {
      alert('Please provide valid credentials.');
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (!res.error) {
          this.userService.user = res.response;
          localStorage.setItem('user', JSON.stringify(res.response));
          this.router.navigate(['/home']);
        }
      },
      error: (err) => console.error(err),
    });
  }
}
