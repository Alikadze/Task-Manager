import { TestBed } from '@angular/core/testing';

import { ProjectColorService } from './project-color.service';

describe('ProjectColorService', () => {
  let service: ProjectColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
