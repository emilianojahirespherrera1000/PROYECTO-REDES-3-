import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private dataUrl = environment.dataUrl;
  private adminUrl = environment.adminUrl; // IP de tu VM APP

  constructor(private http: HttpClient) { }

  getBuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dataUrl}/buses`);
  }

  getRoutes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dataUrl}/routes`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dataUrl}/users`);
  }

  addBus(bus: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/buses/add`, bus, { responseType: 'text' });
  }

  updateBus(id: string, bus: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/buses/update/${id}`, bus, { responseType: 'text' });
  }

  deleteBus(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/buses/delete/${id}`, { responseType: 'text' });
  }

  addRoute(route: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/routes/add`, route, { responseType: 'text' });
  }

  updateRoute(id: string, route: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/routes/update/${id}`, route, { responseType: 'text' });
  }

  deleteRoute(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/routes/delete/${id}`, { responseType: 'text' });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/users/add`, user, { responseType: 'text' });
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/users/update/${id}`, user, { responseType: 'text' });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/users/delete/${id}`, { responseType: 'text' });
  }
}