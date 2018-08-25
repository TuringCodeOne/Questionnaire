import { TestBed, inject } from '@angular/core/testing';

import { LoginoutService } from './loginout.service';

describe('LoginoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginoutService]
    });
  });

  it('should be created', inject([LoginoutService], (service: LoginoutService) => {
    expect(service).toBeTruthy();
  }));
});
