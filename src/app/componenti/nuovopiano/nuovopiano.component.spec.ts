import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovopianoComponent } from './nuovopiano.component';

describe('NuovopianoComponent', () => {
  let component: NuovopianoComponent;
  let fixture: ComponentFixture<NuovopianoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovopianoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovopianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
