import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecommissioneComponent } from './homecommissione.component';

describe('HomecommissioneComponent', () => {
  let component: HomecommissioneComponent;
  let fixture: ComponentFixture<HomecommissioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecommissioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecommissioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
