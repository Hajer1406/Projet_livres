import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { UpdateLivre } from './update-livre';

describe('UpdateLivre', () => {
  let component: UpdateLivre;
  let fixture: ComponentFixture<UpdateLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLivre],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

