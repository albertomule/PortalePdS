import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianiapprovatiComponent } from './pianiapprovati.component';

describe('PianiapprovatiComponent', () => {
  let component: PianiapprovatiComponent;
  let fixture: ComponentFixture<PianiapprovatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PianiapprovatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PianiapprovatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
