import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEsnComponent } from './list-esn.component';

describe('ListEsnComponent', () => {
  let component: ListEsnComponent;
  let fixture: ComponentFixture<ListEsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEsnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
