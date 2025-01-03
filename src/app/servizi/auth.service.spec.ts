import { TestBed } from '@angular/core/testing';

import { AuthsService } from './auths.service';

describe('AuthsService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
