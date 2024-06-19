import { Injectable, inject } from "@angular/core";
import { ProjectService } from "../services/project.service";
import { ProjectPayload, ProjectResponse } from "../interfaces/project";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {
  projectService = inject(ProjectService);
  storageService = inject(StorageService);

  myProjects: BehaviorSubject<ProjectResponse[]> = new BehaviorSubject<ProjectResponse[]>([]);

  myProjects$ = this.myProjects.asObservable();

    
  get themeColor() {
    return this.storageService.getItem('color')
  }

  addProject(payload: ProjectPayload): Observable<ProjectResponse> {
    return this.projectService.addProject(payload)
      .pipe(
        tap((res : ProjectResponse) => {
          this.storageService.setItem('name', res.name);
          this.storageService.setItem('abbreviation', res.abbreviation);
          this.storageService.setItem('description', res.description);
          this.storageService.setItem('color', res.color);
        }) as any
      )
  }

  
  getMyProjects$(): Observable<ProjectResponse[]> {
    return this.projectService.getMyProjects()
      .pipe(
        tap(projects => this.myProjects.next(projects as ProjectResponse[]))
      )
  }

  getProject(): ProjectResponse {
    const project = this.storageService.getItem('project');
    return project ? JSON.parse(project) : null;
  }

  getProjectById(id: number): Observable<ProjectResponse> {
    return this.projectService.getProject(id)
  }

  getUniqueColors(): Observable<string[]> {
    return this.myProjects$.pipe(
      map(projects => {
        const colors = projects.map(project => project.color);
        return [...new Set(colors)];
      })
    );
  }
}