import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegolamentiComponent } from './regolamenti.component';

describe('RegolamentiComponent', () => {
  let component: RegolamentiComponent;
  let fixture: ComponentFixture<RegolamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegolamentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegolamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
