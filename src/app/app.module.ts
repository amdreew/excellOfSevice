import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InventarioService } from './services/inventario.service'
import { from } from 'rxjs';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
import { VacunasComponent } from './components/vacunas/vacunas.component';

@NgModule({
  declarations: [
    AppComponent,
    AtencionesComponent,
    VacunasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InventarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
