import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Bus {
  id: string;
  plate: string;
  driverName: string;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
  currentPassengers?: number;
  lastUpdate?: Date;
  routeId?: string;
}

export interface BusLocation {
  busId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: Date;
  accuracy: number;
}

export interface BusStats {
  totalBuses: number;
  activeBuses: number;
  inactiveBuses: number;
  maintenanceBuses: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://192.168.1.107:8080/api'; // App Server IP
  private busLocationsSubject = new BehaviorSubject<Map<string, BusLocation>>(new Map());
  public busLocations$ = this.busLocationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Actualizar ubicaciones cada 5 segundos
    this.startLocationUpdates();
  }

  // CRUD Operations
  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/buses`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getActiveBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/buses/active`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getBusById(id: string): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/buses/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.apiUrl}/buses`, bus, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateBus(id: string, bus: Partial<Bus>): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/buses/${id}`, bus, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteBus(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/buses/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Location Tracking
  getBusLocation(busId: string): Observable<BusLocation> {
    return this.http.get<BusLocation>(`${this.apiUrl}/buses/${busId}/location`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAllBusLocations(): Observable<BusLocation[]> {
    return this.http.get<BusLocation[]>(`${this.apiUrl}/buses/locations`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateBusLocation(busId: string, location: Partial<BusLocation>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/buses/${busId}/location`, location, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Statistics
  getBusStats(): Observable<BusStats> {
    return this.http.get<BusStats>(`${this.apiUrl}/buses/stats`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Status Management
  updateBusStatus(busId: string, status: Bus['status']): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/buses/${busId}/status`, { status }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Real-time Location Updates
  private startLocationUpdates(): void {
    interval(5000) // Actualizar cada 5 segundos
      .pipe(
        switchMap(() => this.getAllBusLocations())
      )
      .subscribe(locations => {
        const locationMap = new Map<string, BusLocation>();
        locations.forEach(loc => locationMap.set(loc.busId, loc));
        this.busLocationsSubject.next(locationMap);
      });
  }

  // Get ETA (Estimated Time of Arrival)
  getBusETA(busId: string, destinationLat: number, destinationLng: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/buses/${busId}/eta`, {
      params: {
        lat: destinationLat.toString(),
        lng: destinationLng.toString()
      },
      headers: this.authService.getAuthHeaders()
    });
  }

  // Maintenance
  scheduleMaintenance(busId: string, maintenanceData: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/buses/${busId}/maintenance`, maintenanceData, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMaintenanceHistory(busId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buses/${busId}/maintenance/history`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Trip Management
  startTrip(busId: string, routeId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/buses/${busId}/trip/start`, { routeId }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  endTrip(busId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/buses/${busId}/trip/end`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Passenger Count
  updatePassengerCount(busId: string, count: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/buses/${busId}/passengers`, { count }, {
      headers: this.authService.getAuthHeaders()
    });
  }
}