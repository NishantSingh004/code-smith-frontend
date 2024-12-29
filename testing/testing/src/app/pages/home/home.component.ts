import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CompilerService } from '../../services/compiler.service';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../services/user-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Compiler {
  compilerid: string;
  name: string;
  language: string;
  code: string;
  userid: string;
  __v: number;
  _id: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private compilerService = inject(CompilerService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  compiles: Compiler[] = [];

  ngOnInit(): void {
    this.compilerService.getCompilers().subscribe({
      next: (res: any) => {
        this.compiles = res.response;
        this.cdr.detectChanges(); // Detect changes explicitly
      },
    });
  }

  create() {
    this.compilerService.newCompiler().subscribe({
      next: (res: any) => {
        this.router.navigate(['/coding', res.response.compilerid]);
        this.cdr.detectChanges();
      },
    });
  }

  delete(compilerId: string) {
    this.compilerService.delete(compilerId).subscribe({
      next: () => {
        this.compiles = this.compiles.filter(
          (compiler) => compiler.compilerid !== compilerId
        );
      },
    });
  }
}
