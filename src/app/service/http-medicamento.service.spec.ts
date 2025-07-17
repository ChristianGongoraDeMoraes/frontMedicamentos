import { TestBed } from '@angular/core/testing';

import { HttpMedicamentoService } from './http-medicamento.service';

describe('HttpMedicamentoService', () => {
  let service: HttpMedicamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMedicamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
