import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodgladDietModalComponent } from './podglad-diet-modal.component';

describe('PodgladDietModalComponent', () => {
  let component: PodgladDietModalComponent;
  let fixture: ComponentFixture<PodgladDietModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodgladDietModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodgladDietModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
