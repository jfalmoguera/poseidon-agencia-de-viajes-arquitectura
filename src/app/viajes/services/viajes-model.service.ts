import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { IdValor } from 'src/app/models/id-valor';
import { GridEvent } from '../models/grid-event';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { ViajesGridResult } from '../models/viajes-grid-result';

export interface ViajeDelete {
  destroyedRow: number
  delete: boolean,
  porque?: 'l.fdjafldskjflajflñasjflaksjfñlsdjfl'
}

@Injectable({
  providedIn: 'root'
})
export class ViajesModelService {

  private tiposDeViaje: IdValor[] = [
    { id: 1, valor: 'Familar' },
    { id: 2, valor: 'Trabajo' },
    { id: 3, valor: 'Luna De Miel' },
    { id: 4, valor: 'Ahora Mismo Por Favor' },
    { id: 5, valor: 'Aventura' },
    { id: 6, valor: 'Cultural' },
    { id: 7, valor: 'Luxury' },
    { id: 8, valor: 'Gastronomico' },
  ];

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getViajes(): Observable<ViajesGridResult> {

    const headers = new HttpHeaders({
      Pepito: `Mi nombre es pepito`
    })

    let params = new HttpParams();
    params = params.set('page', 1);
    params = params.set('pageSize', 5);

    return this.http.get<ViajesGridResult>(`${this.url}/viajes`, { headers, params }).pipe(
      map(x => new ViajesGridResult(x))
    );

  }

  getViajeById(id: string): Observable<Viaje> {

    return this.http.get<Viaje>(`${this.url}/viajes/${id}`).pipe(
      map(x => new Viaje(x))
    );

  }

  guardar(viaje: Viaje): Observable<Viaje | null> {

    if (!viaje) {
      return of(null);
    }

    if (viaje.id) {
      return this.http.put<Viaje>(`${this.url}/viajes/${viaje.id}`, viaje).pipe(
        map(x => new Viaje(x))
      );
    }

    return this.http.post<Viaje>(`${this.url}/viajes/`, viaje).pipe(
      map(x => new Viaje(x))
    );

  }

  eliminar(id: string): Observable<boolean | null> {

    if (id) {
      return this.http.delete<any>(`${this.url}/viajes/${id}`, { observe: 'response' }).pipe(
        map(x => x.status === HttpStatusCode.Ok));
    }

    return of(null);
  }

  buscar(filtro: ViajesFilter | null, ev: GridEvent = { page: 1, pageSize: 5 }): Observable<ViajesGridResult> {


    //#region samples

    // let params = '';

    // if (filtro?.tipoDeViajeId) {
    //   params = `tipoDeViajeId=${tipoDeViajeId}`;
    // }

    // if (filtro?.nombre) {
    //   params = params ? `${params}&nombre=${nombre}` : `nombre=${nombre}`;
    // }

    // if (filtro?.destino) {
    //   params = params ? `${params}&destino=${destino}` : `destino=${destino}`;
    // }

    // return this.http.get<Viaje[]>(`${this.url}/viajes/search?${params}`).pipe(
    //   map(x => x.map(v => new Viaje(v)))
    // );

    //#endregion

    let httpP = new HttpParams();

    if (filtro) {
      const { nombre, destino, tipoDeViajeId } = filtro;

      if (filtro?.tipoDeViajeId) {
        httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
      }

      if (filtro?.nombre) {
        httpP = httpP.set('nombre', nombre);
      }

      if (filtro?.destino) {
        httpP = httpP.set('destino', destino);
      }

    }

    if (ev.page && ev.pageSize) {
      httpP = httpP.set('page', ev.page);
      httpP = httpP.set('pageSize', ev.pageSize);
    }

    return this.http.get<ViajesGridResult>(`${this.url}/viajes/search`, { params: httpP }).pipe(
      map(x => new ViajesGridResult(x))
    );

  }

  getTiposDeViajes(): IdValor[] {
    return this.tiposDeViaje;
  }

}
