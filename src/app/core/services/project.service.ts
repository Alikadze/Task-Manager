import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ProjectPayload, ProjectResponse } from '../interfaces/project';
import { PaginationResponse } from '../interfaces/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService {

  getProjects(): Observable<PaginationResponse<ProjectResponse>> {
    return this.get<PaginationResponse<ProjectResponse>>('project');
  }

  getAllProjects(): Observable<ProjectResponse[]> {
    return this.get<ProjectResponse[]>('project/all');
  }

  getMyProjects(): Observable<ProjectResponse[]> {
    return this.get<ProjectResponse[]>('project/my');
  }

  getProject(id: number): Observable<ProjectResponse> {
    return this.get<ProjectResponse>(`project/${id}`);
  }

  addProject(project: ProjectPayload): Observable<ProjectResponse> {
    return this.post<ProjectResponse>('project', project);
  }
}
