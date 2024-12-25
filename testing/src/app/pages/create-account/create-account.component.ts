import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  createAccountForm!: FormGroup;
  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  create() {
    if (this.createAccountForm.invalid) {
      alert('Please provide valid credentials.');
      return;
    }
    this.userService.createAccount(this.createAccountForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (!res.error) {
          this.userService.user = res.response;
          localStorage.setItem('user', JSON.stringify(res.response));
          this.router.navigate(['/home']);
        } else {
          alert('Login failed: ' + res.message);
        }
      },
      error: (err) => {
        console.log(err);
        alert('An error occurred. Please try again later.');
      },
    });
  }
}
