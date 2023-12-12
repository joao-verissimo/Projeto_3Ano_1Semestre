import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
