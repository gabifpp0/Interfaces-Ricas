import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceContainerComponent } from './doce-container.component';

describe('DoceContainerComponent', () => {
  let component: DoceContainerComponent;
  let fixture: ComponentFixture<DoceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
