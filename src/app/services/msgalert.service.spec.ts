import { TestBed } from '@angular/core/testing';

import { MsgalertService } from './msgalert.service';

describe('MsgalertService', () => {
  let service: MsgalertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgalertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
