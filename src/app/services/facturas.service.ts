import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  uri = 'http://127.0.0.1:3000/';
  constructor(private http: HttpClient) { }

  getFacturas(): Observable<factura[]> {
    const url = `${this.uri}factucentro`;
    return this.http.get<factura[]>(url).pipe(
      map((res) => res as factura[])
    );
  }

  getCentros(): Observable<centros[]> {
    const url = `${this.uri}centros`;
    return this.http.get<centros[]>(url).pipe(
      map((res) => res as centros[])
    );
  }

  getNUser(docu:string): Observable<nuser[]> {
    const url = `${this.uri}eseuser/${docu}`;
    return this.http.get<nuser[]>(url).pipe(
      map((res) => res as nuser[])
    );
  }
}


export interface centros {
  codigo_centro: string;
  nombre_centro: string;
}

export interface factura {
  consecutivo:string;
  codigo_facturador:string;
  cod_centro:string;
}

export interface nuser {
  nombre:string;
}