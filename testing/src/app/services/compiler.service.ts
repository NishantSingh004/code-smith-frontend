import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './user-service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompilerService {
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  private apiUrl = environment.apiUrl;

  public newCompiler() {
    const userId = this.userService.user._id;
    return this.httpClient.post(`${this.apiUrl}/compiler`, { userid: userId });
  }

  public getCompilers() {
    return this.httpClient.get(
      `${this.apiUrl}/compiler/user/${this.userService.user._id}`
    );
  }

  getCompilerData(compilerId: any) {
    return this.httpClient.get(`${this.apiUrl}/compiler/${compilerId}`);
  }

  run(opts: any) {
    return this.httpClient.post(`${this.apiUrl}/execute`, opts);
  }

  save(compilerObj: any) {
    return this.httpClient.put(`${this.apiUrl}/compiler`, compilerObj);
  }

  delete(compilerId: any) {
    return this.httpClient.delete(`${this.apiUrl}/compiler/${compilerId}`);
  }
}
