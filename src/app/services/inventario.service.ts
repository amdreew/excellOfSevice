import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private httpheadesrs = new HttpHeaders({'Content-Type': 'application/json'});
  uri = 'http://127.0.0.1:3000/inventario';
  constructor(private http: HttpClient) { }

  

  getInventario(): Observable<inventario[]> {
    const url = `${this.uri}`;
    return this.http.get<inventario[]>(url).pipe(
      map((res) => res as inventario[])
    );
  }

}

export interface inventario {
  codigo_producto: string;
  nobre_producto: string;  
  codigo_clasificacion: string;
  nombre_clasificacion: string;
  precio: number;
  fecha_entrada: Date;
}
