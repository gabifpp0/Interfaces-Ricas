import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoceListaComponent } from './doce-lista.component';

describe('DoceListaComponent', () => {
  let component: DoceListaComponent;
  let fixture: ComponentFixture<DoceListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoceListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoceListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
