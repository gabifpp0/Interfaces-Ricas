import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceFormComponent } from './doce-form.component';

describe('DoceFormComponent', () => {
  let component: DoceFormComponent;
  let fixture: ComponentFixture<DoceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
