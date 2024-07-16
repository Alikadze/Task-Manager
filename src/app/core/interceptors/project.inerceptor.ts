import { inject } from '@angular/core';
import { 
    HttpInterceptorFn, 
    HttpRequest, 
    HttpHandlerFn,
    HttpEvent, 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectFacade } from '../facades/project.facade';

export const projectInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const projectFacade = inject(ProjectFacade);
    const projectId = projectFacade.getProjectId();

    if (projectId) {
        req = req.clone({
            setHeaders: {
                'project': projectId.toString()
            }
        });
    }

    return next(req);
};
