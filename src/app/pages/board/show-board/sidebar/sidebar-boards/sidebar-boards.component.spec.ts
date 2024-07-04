import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBoardsComponent } from './sidebar-boards.component';

describe('SidebarBoardsComponent', () => {
  let component: SidebarBoardsComponent;
  let fixture: ComponentFixture<SidebarBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarBoardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
