import { TestBed } from '@angular/core/testing';

import { TransfertNationalService } from './transfert-national.service';

describe('TransfertNationalService', () => {
  let service: TransfertNationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfertNationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
