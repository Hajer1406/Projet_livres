import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Livre } from './livre';

describe('LivreService', () => {
  let service: Livre;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Livre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
