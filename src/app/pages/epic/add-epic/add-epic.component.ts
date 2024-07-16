import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EpicFacade } from '../../../core/facades/epic.facade';
import { Router } from '@angular/router';
import { EpicPayload } from '../../../core/interfaces/epic';
import { catchError, throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-epic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './add-epic.component.html',
  styleUrl: './add-epic.component.scss'
})
export class AddEpicComponent {
  epicFacade = inject(EpicFacade);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    position: new FormControl(1, Validators.required),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting: boolean = false;
  isRequestComplete: boolean = false;

  createEpic() {
    if (this.form.invalid || this.isSubmitting || this.isRequestComplete) {
      return;
    }

    if (this.form.invalid){
      if (this.form.get('name')?.errors?.['required']) {
        this.errorMessage = 'name is required';
      } else if (this.form.get('description')?.errors?.['required']) {
        this.errorMessage = 'description is required';
      } else if (this.form.get('position')?.errors?.['required']) {
        this.errorMessage = 'position is required';
      } 

      return;
    }

    this.errorMessage = null;
    this.successMessage = null;
    this.isSubmitting = true;

    const { name, description, position } = this.form.value as { name: string, description: string, position: number };


    const payload: EpicPayload = {
      name,
      description,
      position,
    };

    this.epicFacade.createEpic(payload)
    .pipe(
      catchError((err) => {
        this.errorMessage = err.error?.message ?? 'An unknown error occurred';
        this.isSubmitting = false;
        this.isRequestComplete = false;
        return throwError(() => this.errorMessage);
      })
    )
    .subscribe((res) => {
      this.isSubmitting = false;
      this.isRequestComplete = true;
      if (res) {
        this.successMessage = 'Epic created!';
        const epic = res.id;
        setTimeout(() => {
          this.router.navigate([`/epic/${epic}`]).then(() => {
            this.isRequestComplete = false;
            window.scrollTo(0, 0);
          });
        }, 2000);
      }
    });

  }
}

