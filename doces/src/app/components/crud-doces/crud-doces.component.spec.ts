import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDocesComponent } from './crud-doces.component';

describe('CrudDocesComponent', () => {
  let component: CrudDocesComponent;
  let fixture: ComponentFixture<CrudDocesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDocesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDocesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
