import { TestBed } from '@angular/core/testing';

import { DatistudenteService } from './datistudente.service';

describe('DatistudenteService', () => {
  let service: DatistudenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatistudenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
