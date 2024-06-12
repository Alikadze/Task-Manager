import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectColorService {
  private projectBgColorSubject = new BehaviorSubject<string>('');
  projectBgColor$: Observable<string> = this.projectBgColorSubject.asObservable();

  setProjectBgColor(color: string) {
    this.projectBgColorSubject.next(color);
  }

  getProjectBgColor(): Observable<string> {
    return this.projectBgColor$;
  }
  
}
