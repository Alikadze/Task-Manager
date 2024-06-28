import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoardFacade } from '../../../core/facades/board.facade';
import { Router } from '@angular/router';
import { Boardpayload } from '../../../core/interfaces/project';
import { catchError, throwError } from 'rxjs';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-board',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent {
  form = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    position: new FormControl<number>(0),
  });

  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);
  router = inject(Router);

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting: boolean = false;
  isRequestComplete: boolean = false;

  projectId!: number;

  createBoard() {
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
      } else if (this.form.get('description')?.errors?.['required']) {
        this.errorMessage = 'description is required';
      }
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;
    this.isSubmitting = true;

    const { name, description, position } = this.form.value as { name: string, description: string, position: number };

    const payload: Boardpayload = {
      name,
      description,
      position,
      columns: []
    };

    this.projectId = this.projectFacade.getProjectId() as number;

    this.boardFacade.createBoard(payload, this.projectId)
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
          this.successMessage = 'Board created!';
          const boardId = res.id;
          setTimeout(() => {
            this.router.navigate([`/board/${boardId}`]).then(() => {
              this.isRequestComplete = false;
              window.scrollTo(0, 0);
            });
          }, 2000);
        }
      });
  }
}
