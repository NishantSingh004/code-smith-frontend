import { Routes } from '@angular/router';
import { CodingComponent } from './pages/coding/coding.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'coding/:compilerId',
    component: CodingComponent,
  },
];
