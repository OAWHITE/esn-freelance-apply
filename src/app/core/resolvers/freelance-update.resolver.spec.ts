import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { freelanceUpdateResolver } from './freelance-update.resolver';

describe('freelanceUpdateResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => freelanceUpdateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
