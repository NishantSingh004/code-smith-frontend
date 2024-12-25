import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  public user: any;

  public createAccount(userObj: any) {
    return this.httpClient.post('http://localhost:3000/users', userObj);
  }

  public login(userObj: any) {
    return this.httpClient.post('http://localhost:3000/users/login', userObj);
  }
}
