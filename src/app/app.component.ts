import { Component } from '@angular/core';
import { ExcelServiService } from './services/excel-servi.service'
import { InventarioService, inventario } from './services/inventario.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inve: inventario[];
  inventario_expor:any = [];
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];

    constructor(private excelService:ExcelServiService, private serviInventario:InventarioService){
    }

    getInventari():void{
      this.serviInventario.getInventario().subscribe(
        res => {
          this.inve = res;
          console.log('inventario cargado');  
        });
    }
    limpiarInventario():void {
      if(this.inve != null ){
        let c = 0;
        for(let result of this.inve){
          let codigo = result.codigo_producto;  
          let fecha = result.fecha_entrada;
          let verificar = this.verificarExistencia(codigo, fecha);       
          if( verificar){            
            this.inventario_expor.push(
              {
                codigo_producto: result.codigo_producto,
                nobre_producto: result.nobre_producto,
                precio: result.precio,
                fecha_entrada: result.fecha_entrada
              }
            );
          }
          c++; 
        }
        alert('inventario listo para generar reporte');
        console.log('depuracion terminada');
      }else{
        alert('no se ha cargado el inventario')
      }
    }

    removeItemFromArr (i:number ) {   
      if ( i !== -1 ) {
          this.inventario_expor.splice( i, 1 );
          console.log('eliminado elemento en la posicion'+ i);
      }
  }
   
    verificarExistencia(codigo:string, fecha:Date):boolean{
      var res = true;      
      if(this.inventario_expor != undefined){        
        if(this.inventario_expor.length > 0){
          let c = 0;
          for(let result of this.inventario_expor){            
            if(result.codigo_producto === codigo){
              if(result.fecha_entrada <= fecha){
                this.removeItemFromArr(c);
                res = true;                
              }else{                
                res = false;
                
              }
            } else {              
              res = true;
              
            }
            c++;
          }        
        }else {
          res = true;          
        }
      } 
      return res;     
    }

    generarReporte():void{
     this.excelService.exportAsExcelFile(this.inventario_expor, 'inventario');
     console.log(this.inventario_expor)
     console.log(this.inve);
    }

    export():void {
      this.excelService.exportAsExcelFile(this.data, 'nombre');
    }
}
