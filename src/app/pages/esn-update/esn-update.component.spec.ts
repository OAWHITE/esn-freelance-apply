import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsnUpdateComponent } from './esn-update.component';

describe('EsnUpdateComponent', () => {
  let component: EsnUpdateComponent;
  let fixture: ComponentFixture<EsnUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsnUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsnUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
