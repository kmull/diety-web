import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzyciskiComponent } from './przyciski.component';

describe('PrzyciskiComponent', () => {
  let component: PrzyciskiComponent;
  let fixture: ComponentFixture<PrzyciskiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrzyciskiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzyciskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
