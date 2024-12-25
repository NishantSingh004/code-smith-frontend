import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class CompilerService {
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  public newCompiler() {
    const userId = this.userService.user._id;
    return this.httpClient.post('http://localhost:3000/compiler', {
      userid: userId,
    });
  }

  public getCompilers() {
    return this.httpClient.get(
      'http://localhost:3000/compiler/user/' + this.userService.user._id
    );
  }

  getCompilerData(compilerId: any) {
    return this.httpClient.get('http://localhost:3000/compiler/' + compilerId);
  }

  run(opts: any) {
    return this.httpClient.post('http://localhost:3000/execute', opts);
  }

  save(compilerObj: any) {
    return this.httpClient.put('http://localhost:3000/compiler', compilerObj);
  }

  delete(compilerId: any) {
    return this.httpClient.delete(
      'http://localhost:3000/compiler/' + compilerId
    );
  }
}
