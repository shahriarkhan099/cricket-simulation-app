import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipTossComponent } from './flip-toss.component';

describe('FlipTossComponent', () => {
  let component: FlipTossComponent;
  let fixture: ComponentFixture<FlipTossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlipTossComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlipTossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
