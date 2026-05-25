import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Cliente } from '../../../../shared/interfaces/cliente';
import { Producto } from '../../../../shared/interfaces/producto';

@Component({
  selector: 'app-registro-venta',
  standalone: false,
  templateUrl: './registro-venta.html',
  styleUrls: ['./registro-venta.css'],
})
export class RegistroVenta implements OnInit {
  ventaForm!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  totalGeneral = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  initForm(): void {
    this.ventaForm = this.fb.group({
      clienteId: ['', Validators.required],
      detalles: this.fb.array([]),
    });
  }

  cargarDatos(): void {
    this.apiService.getClientes().subscribe((data) => (this.clientes = data));
    this.apiService.getProductos().subscribe((data) => (this.productos = data));
  }

  get detalles(): FormArray {
    return this.ventaForm.get('detalles') as FormArray;
  }

  agregarProducto(): void {
    const productoForm = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [{ value: 0, disabled: true }],
      stock: [{ value: 0, disabled: true }],
      subtotal: [{ value: 0, disabled: true }],
    });

    this.detalles.push(productoForm);
  }

  onProductoChange(index: number): void {
    const fila = this.detalles.at(index);
    const prodId = fila.get('productoId')?.value;
    const productoSeleccionado = this.productos.find((p) => p.id === +prodId);

    if (productoSeleccionado) {
      fila.patchValue({
        precio: productoSeleccionado.precio,
        stock: productoSeleccionado.stock,
      });
      this.calcularSubtotal(index);
    }
  }

  calcularSubtotal(index: number): void {
    const fila = this.detalles.at(index);
    const cantidad = fila.get('cantidad')?.value || 0;
    const precio = fila.get('precio')?.value || 0;
    const stock = fila.get('stock')?.value || 0;

    if (cantidad > stock) {
      alert(`Error: la cantidad ingresada supera al stock disponible (${stock}).`);
      fila.get('cantidad')?.setValue(stock);
      return;
    }

    fila.get('subtotal')?.setValue(cantidad * precio);
    this.calcularTotalGeneral();
  }

  calcularTotalGeneral(): void {
    this.totalGeneral = this.detalles.controls.reduce((acc, control) => {
      return acc + (control.get('subtotal')?.value || 0);
    }, 0);
  }

  eliminarProducto(index: number): void {
    this.detalles.removeAt(index);
    this.calcularTotalGeneral();
  }

  guardarVenta(): void {
    if (this.ventaForm.invalid || this.detalles.length === 0) {
      alert('Por favor, complete todos los campos obligatorios y agregue al menos un producto.');
      return;
    }

    const formValue = this.ventaForm.getRawValue();
    const ventaPayload = {
      clienteId: +formValue.clienteId,
      fecha: new Date().toISOString().split('T')[0],
      detalles: formValue.detalles.map((d: any) => ({
        productoId: +d.productoId,
        nombre: this.productos.find((p) => p.id === +d.productoId)?.nombre ?? '',
        cantidad: d.cantidad,
        precio: d.precio,
        subtotal: d.subtotal,
      })),
      total: this.totalGeneral,
    };

    this.apiService.registrarVenta(ventaPayload).subscribe({
      next: () => {
        alert('Venta registrada con exito.');
        this.ventaForm.reset();
        this.detalles.clear();
        this.totalGeneral = 0;
      },
      error: () => {
        alert('Ocurrio un error al registrar la venta. Intentalo de nuevo.');
      },
    });
  }
}
