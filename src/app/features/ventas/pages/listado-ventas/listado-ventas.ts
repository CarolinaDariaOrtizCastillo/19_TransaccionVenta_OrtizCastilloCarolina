import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Venta } from '../../../../shared/interfaces/venta';

@Component({
  selector: 'app-listado-ventas',
  standalone: false,
  templateUrl: './listado-ventas.html',
  styleUrls: ['./listado-ventas.css'],
})
export class ListadoVentasComponent implements OnInit {
  ventas: Venta[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getVentas().subscribe({
      next: (data) => (this.ventas = data),
      error: (err) => console.error('Error al cargar historial', err),
    });
  }

  obtenerCantidadProductos(venta: Venta): number {
    return venta.detalles.reduce((acc, item) => acc + item.cantidad, 0);
  }
}
