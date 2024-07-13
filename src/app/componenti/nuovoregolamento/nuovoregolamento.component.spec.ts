import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoregolamentoComponent } from './nuovoregolamento.component';

describe('NuovoregolamentoComponent', () => {
  let component: NuovoregolamentoComponent;
  let fixture: ComponentFixture<NuovoregolamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovoregolamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovoregolamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
