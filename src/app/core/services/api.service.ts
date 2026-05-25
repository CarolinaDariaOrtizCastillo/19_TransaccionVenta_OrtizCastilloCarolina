import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../../shared/interfaces/cliente';
import { Producto } from '../../shared/interfaces/producto';
import { Venta } from '../../shared/interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // 1. Datos simulados de Clientes (Pre-cargados)
  private clientesMock: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez', ruc: '10456789123' },
    { id: 2, nombre: 'María Rodríguez', ruc: '20987654321' },
    { id: 3, nombre: 'Distribuidora Norte S.A.C.', ruc: '20555666771' }
  ];

  // 2. Datos simulados de Productos con Stock inicial (Pre-cargados)
  private productosMock: Producto[] = [
    { id: 101, nombre: 'Laptop Gamer Core i7', precio: 1200, stock: 5 },
    { id: 102, nombre: 'Mouse Óptico Inalámbrico', precio: 25, stock: 30 },
    { id: 103, nombre: 'Monitor 27" Full HD', precio: 250, stock: 8 },
    { id: 104, nombre: 'Teclado Mecánico RGB', precio: 75, stock: 12 }
  ];

  // 3. Historial de ventas en memoria (Comienza con una venta de prueba)
  private ventasMock: Venta[] = [
    {
      id: 1,
      clienteId: 1,
      clienteNombre: 'Juan Pérez',
      fecha: '2026-05-20',
      total: 150,
      detalles: [
        { productoId: 104, nombre: 'Teclado Mecánico RGB', cantidad: 2, precio: 75, subtotal: 150 }
      ]
    }
  ];

  constructor() { }

  // Obtener Clientes
  getClientes(): Observable<Cliente[]> {
    return of(this.clientesMock);
  }

  // Obtener Productos
  getProductos(): Observable<Producto[]> {
    return of(this.productosMock);
  }

  // Obtener Historial de Ventas
  getVentas(): Observable<Venta[]> {
    return of(this.ventasMock);
  }

  // Registrar una nueva Venta y descontar del Stock local
  registrarVenta(nuevaVenta: Venta): Observable<any> {
    // Autoincrementar ID de la venta en memoria
    nuevaVenta.id = this.ventasMock.length + 1;
    
    // Buscar el nombre del cliente para que se vea bonito en la tabla de historial
    const cliente = this.clientesMock.find(c => c.id === nuevaVenta.clienteId);
    nuevaVenta.clienteNombre = cliente ? cliente.nombre : 'Cliente Desconocido';

    // ---- Lógica de Descuento de Stock ----
    nuevaVenta.detalles.forEach(detalle => {
      const productoEnAlmacen = this.productosMock.find(p => p.id === detalle.productoId);
      if (productoEnAlmacen) {
        // Restamos la cantidad comprada del stock del Front-End
        productoEnAlmacen.stock -= detalle.cantidad;
      }
    });

    // Guardar la venta en nuestro array en memoria
    this.ventasMock.push(nuevaVenta);

    // Retornamos una respuesta exitosa simulada en formato JSON
    return of({ status: 'success', message: 'Venta guardada localmente', data: nuevaVenta });
  }
}