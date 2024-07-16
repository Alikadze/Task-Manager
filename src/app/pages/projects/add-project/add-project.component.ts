import { AfterViewInit, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ProjectPayload } from '../../../core/interfaces/project';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ProjectColorService } from '../../../core/services/project-color.service';


@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements AfterViewInit{
  form = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(8)]),
    abbreviation: new FormControl('',[Validators.required, Validators.maxLength(4)]),
    description: new FormControl('',[Validators.required]),
    color: new FormControl<string>('#ffff',[Validators.required])
  })


  projectFacade = inject(ProjectFacade);
  router = inject(Router);
  projectColorService = inject(ProjectColorService);

  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngAfterViewInit(): void {
    this.form.get('color')!.valueChanges.subscribe((value) => {
      this.projectFacade.themeColor;
    })
  }

  addProject() {
    this.form.markAllAsTouched();

    if (this.form.invalid){
      if (this.form.get('name')?.errors?.['required']) {
        this.errorMessage = 'name is required';
      } else if (this.form.get('abbreviation')?.errors?.['required']) {
        this.errorMessage = 'abbreviation is required';
      } else if (this.form.get('description')?.errors?.['required']) {
        this.errorMessage = 'description is required';
      } else if (this.form.get('color')?.errors?.['required']) {
        this.errorMessage = 'color is required';
      } else if (this.form.get('name')?.errors?.['maxlength']) {
        this.errorMessage = 'name cannot be longer than 8 characters';
      } else if (this.form.get('abbreviation')?.errors?.['maxlength']) {
        this.errorMessage = 'abbreviation cannot be longer than 4 characters';
      }

      return;
    }

    if (this.form.invalid) {
      return
    }

    this.errorMessage = null;
    this.successMessage = null;

    const {name, abbreviation, description, color} = this.form.value as {name: string, abbreviation: string, description: string, color: string};

    const payload: ProjectPayload = {
      name,
      abbreviation,
      description,
      color
    } 

    this.projectFacade.addProject(payload)
      .pipe(

        catchError((err) => {
          this.errorMessage = err.error?.message ?? 'An unknown error occurred';
          return throwError(() => this.errorMessage);
        })
      )
      .subscribe((res) => {
        if(res) {
          this.successMessage = 'Project created!';
          setTimeout(() => {
            this.router.navigate(['/workspace']);
            window.scrollTo(0,0) 
          }, 2000)
        }
      })
  }

}
