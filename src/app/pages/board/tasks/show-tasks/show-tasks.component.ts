import { Component, inject } from '@angular/core';
import { TaskFacade } from '../../../../core/facades/task.facade';
import { BoardFacade } from '../../../../core/facades/board.facade';

@Component({
  selector: 'app-show-tasks',
  standalone: true,
  imports: [],
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.scss'
})
export class ShowTasksComponent {
  taskFacade = inject(TaskFacade);
  boardFacade = inject(BoardFacade);

  tasks$ = this.taskFacade.getTasks(1, false);

}
