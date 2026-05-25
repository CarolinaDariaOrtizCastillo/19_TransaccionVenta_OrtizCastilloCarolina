export interface DetalleVenta {
  productoId: number;
  nombre?: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  clienteId: number;
  clienteNombre?: string;
  fecha: string;
  detalles: DetalleVenta[];
  total: number;
}
