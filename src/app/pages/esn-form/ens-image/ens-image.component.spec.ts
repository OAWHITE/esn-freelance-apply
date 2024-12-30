import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsImageComponent } from './ens-image.component';

describe('EnsImageComponent', () => {
  let component: EnsImageComponent;
  let fixture: ComponentFixture<EnsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnsImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
