import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroVenta } from './registro-venta';

describe('RegistroVenta', () => {
  let component: RegistroVenta;
  let fixture: ComponentFixture<RegistroVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroVenta],
      imports: [CommonModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
