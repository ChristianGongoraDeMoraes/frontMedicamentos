import { TestBed } from '@angular/core/testing';

import { HttpHorariosService } from './http-horarios.service';

describe('HttpHorariosService', () => {
  let service: HttpHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
