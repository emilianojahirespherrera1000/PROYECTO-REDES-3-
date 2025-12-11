import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { ReplicationService } from '../../services/replication.service';
import { interval, Subscription } from 'rxjs';

interface StatCard { label: string; value: string; change: string; icon: string; color: string; }
interface Activity { type: 'success' | 'warning' | 'info' | 'danger'; message: string; time: string; icon: string; }
interface LiveTracking { id: string; status: string; passengers: number; eta: string; location: string; }

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'] // Puedes copiar los estilos del dashboard viejo aquí
})
export class OverviewComponent implements OnInit, OnDestroy {
  private updateSubscription!: Subscription;

  // Datos Iniciales
  statsCards: StatCard[] = [
    { label: 'Combis Activas', value: '0', change: '+0', icon: 'directions_bus', color: 'blue' },
    { label: 'Usuarios Activos', value: '1,247', change: '+156', icon: 'people', color: 'red' },
    { label: 'Rutas Operando', value: '3', change: '0', icon: 'route', color: 'blue' },
    { label: 'Uptime Sistema', value: '99.9%', change: '+0.1%', icon: 'show_chart', color: 'red' }
  ];

  recentActivity: Activity[] = [];
  liveTracking: LiveTracking[] = [];
  infrastructureStatus: any[] = [];

  constructor(
    private busService: BusService,
    private replicationService: ReplicationService
  ) {}

  ngOnInit(): void {
    // 1. Cargar infraestructura
    this.checkInfrastructure();
    
    // 2. Cargar Logs
    this.loadLogs();

    // 3. Iniciar bucle de Tracking (cada 3 segundos)
    this.updateSubscription = interval(3000).subscribe(() => {
      this.updateLiveTracking();
    });
    
    // Llamada inicial inmediata
    this.updateLiveTracking();
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  checkInfrastructure() {
    this.replicationService.getSystemStatus().subscribe({
      next: (data) => {
        this.infrastructureStatus = [
          { name: 'Servidor NFS (Datos)', ip: '192.168.100.157', status: 'Activo', detail: 'Almacenamiento Físico' },
          { name: 'App Server (Java)', ip: '192.168.100.156', status: data.estado === 'OPERATIVO' ? 'Activo' : 'Inactivo', detail: 'Backend Spring Boot' },
          { name: 'Cliente Android', ip: 'Dinámica', status: 'Conectado', detail: 'Consumiendo API' }
        ];
      },
      error: (err) => console.error('Error infra:', err)
    });
  }

  updateLiveTracking() {
    this.busService.getBusLocation().subscribe({
      next: (dataList) => {
        if (!dataList || dataList.length === 0) return;

        this.liveTracking = dataList.map(bus => ({
          id: bus.busId,
          status: bus.estado || 'En ruta',
          passengers: Math.floor(Math.random() * 40) + 5,
          eta: 'Calculando...',
          location: `${bus.lat.toFixed(4)}, ${bus.lon.toFixed(4)}`
        }));
        
        // Actualizar contador
        if (this.statsCards.length > 0) {
          this.statsCards[0].value = dataList.length.toString();
        }
      },
      error: (err) => console.error('Error tracking:', err)
    });
  }

  loadLogs() {
    this.replicationService.getLogs().subscribe(logText => {
      this.recentActivity.unshift({
        type: 'info',
        message: logText,
        time: 'Ahora',
        icon: 'info'
      });
    });
  }

  getStatusClass(status: string): string {
    return status === 'En ruta' ? 'status-active' : 'status-stopped';
  }

  getActivityClass(type: string): string {
    return `activity-${type}`;
  }
}