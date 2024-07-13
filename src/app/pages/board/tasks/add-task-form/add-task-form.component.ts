import { AfterViewInit, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskFacade } from '../../../../core/facades/task.facade';
import { AuthFacade } from '../../../../core/facades/auth.facade';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Task, TaskPayload } from '../../../../core/interfaces/project';
import { tap } from 'rxjs';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatOptgroup, MatOption, MatSelect } from '@angular/material/select';
import { EpicFacade } from '../../../../core/facades/epic.facade';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButton,
    MatSelect,
    MatOption,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements AfterViewInit {
  taskFacade = inject(TaskFacade);
  authFacade = inject(AuthFacade);
  epicFacade = inject(EpicFacade);

  userId = this.authFacade.user.id;

  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  @Input() boardId!: number;
  @Input() boardColumnId!: number | undefined;
  @Input() taskStatus!: string | undefined;

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskCreationSuccess = new EventEmitter<void>();


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    epicId: new FormControl(0, Validators.required),
    priority: new FormControl('')
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;


  loading = false;

  epics$ = this.epicFacade.getEpics();

  ngAfterViewInit(): void {
    // console.log(this.epics$);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { name, description, epicId, priority } = this.form.value as TaskPayload;
    const taskPayload: TaskPayload = {
      name,
      description,
      epicId,
      priority,
      boardId: this.boardId,
      boardColumnId: this.boardColumnId,
      taskStatus: this.taskStatus,
      isBacklog: true,
      issueTypeId: 3,
      assigneeId: this.userId
    };

    this.taskFacade.createTask(taskPayload).pipe(
      tap({
        next: (createdTask) => {
          this.loading = false;
          
          this.successMessage = "Task added successfully!";
          this.taskAdded.emit(createdTask);
          this.taskCreationSuccess.emit(); // Emit event to signal task creation success

          setTimeout(() => this.resetForm(), 2000);
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      })
    ).subscribe();
  }

  private resetForm(): void {
    this.errorMessage = null;
    this.form.reset({
      name: ' ',
      description: '',
      epicId: 0,
      priority: ''
    });
  }
}
