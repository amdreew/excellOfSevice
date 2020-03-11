import { Component, OnInit } from '@angular/core';
import { FacturasService, centros, Vacunas } from 'src/app/services/facturas.service';
import { ExcelServiService } from 'src/app/services/excel-servi.service';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {
  centros: centros[] = [];
  constructor(private setvi: FacturasService,
              private excelService: ExcelServiService) { }

  ngOnInit(): void {
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
      let vacuna: Vacunas[] = [];
      await this.setvi.getVacunasCentros(centro.codigo_centro).toPromise()
      .then((res) => {
        vacuna = res;
      });
      console.log('procediendo aexportar ');
      this.excelService.exportAsExcelFile(vacuna, centro.nombre_centro);
    }

  }

}
