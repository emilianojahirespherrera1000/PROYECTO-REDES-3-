import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplicationService {
  // IP de tu VM APP
  private adminUrl = environment.adminUrl;

  constructor(private http: HttpClient) { }

  getSystemStatus(): Observable<any> {
    return this.http.get<any>(`${this.adminUrl}/status`);
  }

  getLogs(): Observable<string> {
    return this.http.get(`${this.adminUrl}/ver-logs`, { responseType: 'text' });
  }

  // --- NUEVOS MÉTODOS PARA SETTINGS ---

  resetSimulation(): Observable<string> {
    return this.http.post(`${this.adminUrl}/reset`, {}, { responseType: 'text' });
  }

  seedDatabase(): Observable<string> {
    return this.http.post(`${this.adminUrl}/seed-db`, {}, { responseType: 'text' });
  }

  upgradeSecurity(): Observable<string> {
    return this.http.get(`${this.adminUrl}/upgrade-security`, { responseType: 'text' });
  }
}