import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceUpdateComponent } from './freelance-update.component';

describe('FreelanceUpdateComponent', () => {
  let component: FreelanceUpdateComponent;
  let fixture: ComponentFixture<FreelanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelanceUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
