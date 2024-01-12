import { TestBed } from '@angular/core/testing';

import { ConnectionConnectionService } from './connection-connection.service';

describe('ConnectionConnectionService', () => {
  let service: ConnectionConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
