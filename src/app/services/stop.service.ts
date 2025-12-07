import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  routeIds: string[];
  status: 'active' | 'inactive' | 'maintenance';
  amenities?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StopService {
  private apiUrl = 'http://192.168.1.107:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllStops(): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.apiUrl}/stops`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getStopById(id: string): Observable<Stop> {
    return this.http.get<Stop>(`${this.apiUrl}/stops/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createStop(stop: Stop): Observable<Stop> {
    return this.http.post<Stop>(`${this.apiUrl}/stops`, stop, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateStop(id: string, stop: Partial<Stop>): Observable<Stop> {
    return this.http.put<Stop>(`${this.apiUrl}/stops/${id}`, stop, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteStop(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/stops/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getStopsByRoute(routeId: string): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.apiUrl}/stops/route/${routeId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}