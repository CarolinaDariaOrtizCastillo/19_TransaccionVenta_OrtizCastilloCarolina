import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app';
import { ListadoVentasComponent } from './features/ventas/pages/listado-ventas/listado-ventas';
import { RegistroVenta } from './features/ventas/pages/registro-venta/registro-venta';

@NgModule({
  declarations: [
    AppComponent,
    RegistroVenta,
    ListadoVentasComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
