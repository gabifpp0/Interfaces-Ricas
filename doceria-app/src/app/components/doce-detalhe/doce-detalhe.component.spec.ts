import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceDetalheComponent } from './doce-detalhe.component';

describe('DoceDetalheComponent', () => {
  let component: DoceDetalheComponent;
  let fixture: ComponentFixture<DoceDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoceDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
