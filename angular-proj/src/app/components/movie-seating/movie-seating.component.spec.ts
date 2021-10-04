import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSeatingComponent } from './movie-seating.component';

describe('MovieSeatingComponent', () => {
  let component: MovieSeatingComponent;
  let fixture: ComponentFixture<MovieSeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
