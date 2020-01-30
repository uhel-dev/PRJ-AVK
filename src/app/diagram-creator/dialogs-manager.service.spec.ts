import { TestBed } from '@angular/core/testing';

import { DialogsManagerService } from './dialogs-manager.service';

describe('DialogsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogsManagerService = TestBed.get(DialogsManagerService);
    expect(service).toBeTruthy();
  });
});
