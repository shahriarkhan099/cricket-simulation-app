import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamsComponent } from './select-teams.component';

describe('SelectTeamsComponent', () => {
  let component: SelectTeamsComponent;
  let fixture: ComponentFixture<SelectTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
