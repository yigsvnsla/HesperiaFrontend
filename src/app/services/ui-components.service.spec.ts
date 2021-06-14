import { TestBed } from '@angular/core/testing';

import { UiComponentsService } from './ui-components.service';

describe('UiComponentsService', () => {
  let service: UiComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
