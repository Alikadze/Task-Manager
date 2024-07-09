import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TaskFacade } from '../../../../core/facades/task.facade';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../../../core/facades/auth.facade';
import { MatError, MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { Task, TaskPayload } from '../../../../core/interfaces/project';
import { tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BoardFacade } from '../../../../core/facades/board.facade';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatOption,
    MatLabel,
    MatInputModule,
    NgIf,
    MatError
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  taskFacade = inject(TaskFacade);
  authFacade = inject(AuthFacade);
  boardFacade = inject(BoardFacade);

  userId = this.authFacade.user.id;

  @Input() boardId!: number;
  @Input() boardColumnId!: number | undefined;

  @Output() taskAdded = new EventEmitter<Task>();

  


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    epicId: new FormControl(0, Validators.required),
    priority: new FormControl(''),   
  });

  successMessage: string | null | boolean = false;
  errorMessage: string | null | boolean = false;

  loading = false;

  onSubmit(): void {
    if (this.form.invalid) {
      if (this.form.get('name')?.hasError('required')) {
        this.errorMessage = 'Name is required';
      } else if (this.form.get('epicId')?.hasError('required')) {
        this.errorMessage = 'Epic is required';
      } else if (this.form.get('priority')?.hasError('required')) {
        this.errorMessage = 'Priority is required';
      } else  if (this.form.get('description')?.hasError('required')) {
        this.errorMessage = 'Description is required';
      } else {
        this.errorMessage = 'Something went wrong';
      }

      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const {name, description, epicId, priority} = this.form.value as {name: string, description: string, epicId: number, priority: string};

    const taskPayload: TaskPayload = {
      name,
      description,
      epicId,
      priority,
      boardId: this.boardId,
      boardColumnId: this.boardColumnId,
      taskStatus: 'ToDo',
      isBacklog: true,
      issueTypeId: 3,
      assigneeId: this.userId,
    };

    this.taskFacade.createTask(taskPayload).pipe(
      tap({
        next: (createdTask) => {
          console.log("Created Task:", createdTask); // Verify this log to check the task structure
          this.loading = false;
          this.successMessage = "Task added successfully!";
        
          // Emit the created task to the parent component
          // this.taskAdded.emit(createdTask);
        
          setTimeout(() => {
            this.errorMessage = null;
            this.form.reset({
              name: '',
              description: '',
              epicId: 1,
              priority: ''
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
