import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  // Asegúrate de que esta sea la IP de tu VM APP (Java)
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  // CAMBIO: Ahora devuelve un arreglo (any[])
  getBusLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtener-ubicacion`);
  }
}