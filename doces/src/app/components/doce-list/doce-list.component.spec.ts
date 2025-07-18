import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceListComponent } from './doce-list.component';

describe('DoceListComponent', () => {
  let component: DoceListComponent;
  let fixture: ComponentFixture<DoceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
