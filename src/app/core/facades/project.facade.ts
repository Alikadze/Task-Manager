import { Injectable, inject } from "@angular/core";
import { ProjectService } from "../services/project.service";
import { ProjectPayload, ProjectResponse } from "../interfaces/project";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {
  projectService = inject(ProjectService);
  storageService = inject(StorageService);

  myProjects: BehaviorSubject<ProjectPayload[]> = new BehaviorSubject<ProjectPayload[]>([]);

  myProjects$ = this.myProjects.asObservable();


  addProject(payload: ProjectPayload): Observable<ProjectResponse> {
    return this.projectService.addProject(payload)
      .pipe(
        tap((res : ProjectPayload) => {
          this.storageService.setItem('name', res.name);
          this.storageService.setItem('abbreviation', res.abbreviation);
          this.storageService.setItem('description', res.description);
          this.storageService.setItem('color', res.color);
        }) as any
      )
  }

  
  getMyProjects$(): Observable<ProjectPayload[]> {
    return this.projectService.getMyProjects()
      .pipe(
        tap(projects => this.myProjects.next(projects))
      )
  }

  getProject(): ProjectPayload {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;
  }
}