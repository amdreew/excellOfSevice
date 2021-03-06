import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import { ExcelServiService } from 'src/app/services/excel-servi.service';
import { centros, Atenciones} from 'src/app/services/facturas.service';

@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.css']
})
export class AtencionesComponent implements OnInit {
  centros: centros[] = [];
  constructor(private setvi: FacturasService,
              private excelService: ExcelServiService) { }

  ngOnInit() {
    this.procesCentros();
  }

  private async procesCentros() {
    await this.setvi.getCentros().toPromise()
    .then((res) => {
      this.centros = res;
    });
    console.log(this.centros);
    this.excelService.exportAsExcelFile(this.centros, 'centros');
  }

  atencionestest(): void {
    this.atenproces();
  }

  private async atenproces() {
    for (const centro of this.centros) {
      console.log(`iniciando el centro ${centro.nombre_centro}`);
      let atenciones: Atenciones[] = [];
      await this.setvi.getAtenciones(centro.codigo_centro).toPromise()
      .then((res) => {
        atenciones = res;
      });
      console.log('procediendo aexportar ');
      this.excelService.exportAsExcelFile(atenciones, centro.nombre_centro);
    }

  }



}
