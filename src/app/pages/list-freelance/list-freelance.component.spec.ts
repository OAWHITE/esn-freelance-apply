import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFreelanceComponent } from './list-freelance.component';

describe('ListFreelanceComponent', () => {
  let component: ListFreelanceComponent;
  let fixture: ComponentFixture<ListFreelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFreelanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
