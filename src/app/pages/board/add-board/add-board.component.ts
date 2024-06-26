import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoardFacade } from '../../../core/facades/board.facade';
import { Router } from '@angular/router';
import { Boardpayload } from '../../../core/interfaces/project';
import { catchError, throwError } from 'rxjs';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-add-board',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.scss'
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

  projectId!: number;

  createBoard() {
    
    if (this.form.invalid) {
      return
    }

    this.errorMessage = null;
    this.successMessage = null;
  
  
    const {name, description, position} = this.form.value as {name: string, description: string, position: number}

    

    const payload: Boardpayload = {
      name,
      description,
      position,
      columns: []
    }

    this.projectId = this.projectFacade.getProjectId() as number;

    console.log("fdfd", this.projectId);
    

    this.boardFacade.createBoard(payload, this.projectId)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.error?.message ?? 'An unknown error occurred';
          return throwError(() => this.errorMessage);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.successMessage = 'Board created!';
          const boardId = res.id;
          setTimeout(() => {
            this.router.navigate([`/board/${boardId}`])
            window.scrollTo(0,0)
          }, 2000)
        }
      })
  }




}
