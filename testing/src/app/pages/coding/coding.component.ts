import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
} from 'ngx-monaco-editor-v2';
import { CompilerService } from '../../services/compiler.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-coding',
  standalone: true,
  imports: [
    MonacoEditorModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.css',
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: { baseUrl: '/assets/monaco-editor/min/vs' },
    },
  ],
})
export class CodingComponent implements OnInit {
  private router = inject(Router);
  private compilerService = inject(CompilerService);
  private route = inject(ActivatedRoute);

  compileid: any = '';
  compile: any;
  stdin: any = '';

  editorOptions = {
    theme: 'vs-dark',
    language: '',
  };

  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  stdOut = 'Run the code to get code';

  ngOnInit(): void {
    this.compileid = this.route.snapshot.paramMap.get('compilerId');
    this.compilerService.getCompilerData(this.compileid).subscribe({
      next: (res: any) => {
        this.compile = res.response;
        this.code = this.compile.code;
        this.editorOptions.language = this.compile.language;
      },
    });
  }

  save() {
    this.compile.code = this.code;
    this.compilerService.save(this.compile).subscribe({
      next: (res: any) => {},
    });
  }

  run() {
    let opts = {
      script: this.code,
      stdin: this.stdin,
      language: this.compile.language,
    };
    this.compilerService.run(opts).subscribe({
      next: (res: any) => {
        this.stdOut = res.response.output;
        console.log(this.stdOut);
      },
    });
  }

  Delete() {
    this.compilerService.delete(this.compile.compileid).subscribe({
      next: (res: any) => {
        this.router.navigate(['/home']);
      },
    });
  }
}
