import { Component, OnInit } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { ReplicationService } from '../../services/replication.service';

interface StatCard { label: string; value: string; change: string; icon: string; color: string; }
interface Activity { type: 'success' | 'warning' | 'info' | 'danger'; message: string; time: string; icon: string; }
interface LiveTracking { id: string; status: string; passengers: number; eta: string; location: string; }

@Component({
  selector: 'app-dashboard',
  standalone: false, // <--- OBLIGATORIO
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  
  statsCards: StatCard[] = [
    { label: 'Combis Activas', value: '24', change: '+2', icon: 'directions_bus', color: 'blue' },
    { label: 'Usuarios Activos', value: '1,247', change: '+156', icon: 'people', color: 'red' },
    { label: 'Rutas Operando', value: '3', change: '0', icon: 'route', color: 'blue' },
    { label: 'Uptime Sistema', value: '99.8%', change: '+0.2%', icon: 'show_chart', color: 'red' }
  ];

  recentActivity: Activity[] = [
    { type: 'success', message: 'Combi #A-107 conectada', time: 'Hace 2 min', icon: 'check_circle' },
    { type: 'warning', message: 'Replicación NFS retrasada', time: 'Hace 5 min', icon: 'warning' },
    { type: 'info', message: 'Nueva ruta agregada', time: 'Hace 15 min', icon: 'info' }
  ];

  liveTracking: LiveTracking[] = [
    { id: 'A-107', status: 'En ruta', passengers: 18, eta: '5 min', location: 'Av. Aguascalientes' },
    { id: 'A-108', status: 'En ruta', passengers: 22, eta: '12 min', location: 'Pabellón Centro' }
  ];

  infrastructureStatus = [
    { name: 'Servidor NFS', ip: '192.168.1.73', status: 'Activo', detail: 'Replicación activa' },
    { name: 'App Server', ip: '192.168.1.107', status: 'Activo', detail: 'NFS Cliente activo' }
  ];

  constructor(
    private busService: BusService,
    private replicationService: ReplicationService
  ) {}

  ngOnInit(): void {
    // Aquí puedes llamar a tus servicios
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getStatusClass(status: string): string {
    return status === 'En ruta' ? 'status-active' : 'status-stopped';
  }

  getActivityClass(type: string): string {
    return `activity-${type}`;
  }
}