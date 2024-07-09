import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Task, TaskPayload } from '../interfaces/project';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiService {

  getTask(id: number): Observable<Task> {
    return this.get<Task>(`task/${id}`)
  }

  getTasks(boardId: number, isBacklog: boolean, projectId?: number): Observable<Task[]> {
    const headers = new HttpHeaders().set('project', projectId!.toString());
    return this.get<Task[]>(`task`, {boardId, isBacklog}, headers )
  }

  createTask(taskPayload: TaskPayload, projectId: number): Observable<Task> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.post<Task>(`task`, taskPayload , headers )
  }

  updateTask(taskId: number, updatedTask: Partial<Task>, projectId: number): Observable<Task> {
    const url = `${this.apiUrl}/task/${taskId}`;
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.httpClient.put<Task>(url, updatedTask, { headers }).pipe(
      map(response => {
        if (typeof response === 'object' && response !== null) {
          return response as Task;
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          errorMsg = `Server-side error: ${error.status} - ${error.statusText}`;
        }
        console.error(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }


  

  deleteTask(id: number): Observable<any> {
    return this.delete<Task>(`task/${id}`)
  }
}
