import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  public user: any;

  public createAccount(userObj: any) {
    return this.httpClient.post(`${this.apiUrl}/users`, userObj);
  }

  public login(userObj: any) {
    return this.httpClient.post(`${this.apiUrl}/users/login`, userObj);
  }
}
