import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEpicComponent } from './show-epic.component';

describe('ShowEpicComponent', () => {
  let component: ShowEpicComponent;
  let fixture: ComponentFixture<ShowEpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEpicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
