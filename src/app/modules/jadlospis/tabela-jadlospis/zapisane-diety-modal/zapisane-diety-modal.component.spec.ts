import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapisaneDietyModalComponent } from './zapisane-diety-modal.component';

describe('ZapisaneDietyModalComponent', () => {
  let component: ZapisaneDietyModalComponent;
  let fixture: ComponentFixture<ZapisaneDietyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZapisaneDietyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapisaneDietyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
