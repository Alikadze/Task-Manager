import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColFormComponent } from './add-col-form.component';

describe('AddColFormComponent', () => {
  let component: AddColFormComponent;
  let fixture: ComponentFixture<AddColFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddColFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddColFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
