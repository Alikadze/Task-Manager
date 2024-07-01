import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoardFacade } from '../../../../core/facades/board.facade';
import { ProjectFacade } from '../../../../core/facades/project.facade';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { tap } from 'rxjs';
import { ColumnPayload } from '../../../../core/interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-col-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './add-col-form.component.html',
  styleUrls: ['./add-col-form.component.scss']
})
export class AddColFormComponent implements OnInit {

  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);
  cdr = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);

  boardId!: number;
  projectId: number = this.projectFacade.getProjectId();
  successMessage: string | null | boolean = false;
  errorMessage: string | null | boolean = false;
  loading = false;

  @Output() columnAdded = new EventEmitter<ColumnPayload>();

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
  }

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    position: new FormControl(1),
    taskStatus: new FormControl('')
  })

  addColumn(): void {
    this.loading = true;
    this.errorMessage = null;

    const { name, description, position, taskStatus } = this.form.value as {
      name: string,
      description: string,
      position: number,
      taskStatus: string
    };

    const columnPayload: ColumnPayload = {
      name,
      description,
      position,
      taskStatus,
      tasks: []
    };

    this.boardFacade.addColumn(this.boardId, this.projectId, columnPayload).pipe(
      tap({
        next: (updatedBoard) => {
          console.log("Updated Board:", updatedBoard);
          this.loading = false;
          this.successMessage = "Column added successfully!";

          setTimeout(() => {
            this.errorMessage = null;
            this.columnAdded.emit(columnPayload);
            this.form.reset({
              name: '',
              description: '',
              position: 1,
              taskStatus: ''
            });  
          }, 2000);
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = "Failed to add column.";
          this.successMessage = null;
          this.loading = false;
        }
      })
    ).subscribe();
  }
}
