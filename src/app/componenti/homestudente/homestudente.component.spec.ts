import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestudenteComponent } from './homestudente.component';

describe('HomestudenteComponent', () => {
  let component: HomestudenteComponent;
  let fixture: ComponentFixture<HomestudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomestudenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomestudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
