import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianiinsospesoComponent } from './pianiinsospeso.component';

describe('PianiinsospesoComponent', () => {
  let component: PianiinsospesoComponent;
  let fixture: ComponentFixture<PianiinsospesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PianiinsospesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PianiinsospesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
