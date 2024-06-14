import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ProjectPayload, ProjectResponse } from '../interfaces/project';
import { PaginationResponse } from '../interfaces/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService {
  apiUrl = environment.apiUrl;

  getProjects(): Observable<PaginationResponse<ProjectPayload>> {
    return this.get<PaginationResponse<ProjectPayload>>(`project`);
  }

  getAllProjects(): Observable<ProjectPayload[]> {
    return this.get<ProjectPayload[]>(`project/all`);
  }

  getMyProjects(): Observable<ProjectPayload[]> {
    return this.get<ProjectPayload[]>(`project/my`);
  }

  getProject(id: number): Observable<ProjectPayload> {
    return this.get<ProjectPayload>(`project/${id}`);
  }

  addProject(project: ProjectPayload): Observable<ProjectPayload> {
    return this.post<ProjectPayload>('project', project);
  }

  
}
