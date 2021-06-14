import { TestBed } from '@angular/core/testing';

import { CoreConectionService } from './core-conection.service';

describe('CoreConectionService', () => {
  let service: CoreConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
