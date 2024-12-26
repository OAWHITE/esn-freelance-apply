import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceFormComponent } from './freelance-form.component';

describe('FreelanceFormComponent', () => {
  let component: FreelanceFormComponent;
  let fixture: ComponentFixture<FreelanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelanceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
