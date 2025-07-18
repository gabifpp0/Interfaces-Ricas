import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceDetailComponent } from './doce-detail.component';

describe('DoceDetailComponent', () => {
  let component: DoceDetailComponent;
  let fixture: ComponentFixture<DoceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
