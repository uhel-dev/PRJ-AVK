import { TestBed } from '@angular/core/testing';

import { JsPlumbManagerService } from './js-plumb-manager.service';

describe('JsPlumbManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsPlumbManagerService = TestBed.get(JsPlumbManagerService);
    expect(service).toBeTruthy();
  });
});
