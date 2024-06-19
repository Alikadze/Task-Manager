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
    const project = projectFacade.getProject();

    if (project) {
        req = req.clone({
            setHeaders: {
                'project': project.id.toString()
            }
        });
    }

    return next(req);
};
