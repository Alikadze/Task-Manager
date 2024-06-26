import { Component, inject } from '@angular/core';
import { BoardFacade } from '../../../core/facades/board.facade';
import { AsyncPipe, JsonPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../../core/interfaces/project';
import { Observable, catchError, of, throwError } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-show-board',
  standalone: true,
  imports: [
  ],
  templateUrl: './show-board.component.html',
  styleUrl: './show-board.component.scss'
})
export class ShowBoardComponent {

}


