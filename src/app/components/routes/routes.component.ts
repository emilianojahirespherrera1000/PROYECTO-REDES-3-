import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <--- Importar
import { DataProviderService } from '../../services/data-provider.service';
import { RouteDialogComponent } from '../../components/route-dialog/route-dialog.component'; // Tu nuevo dialogo

@Component({
  selector: 'app-routes',
  standalone: false,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  routes: any[] = [];
  loading = true;

  constructor(
    private dataProvider: DataProviderService,
    private dialog: MatDialog // <--- Inyectar
  ) {}

  ngOnInit(): void { this.loadRoutes(); }

  loadRoutes() {
    this.loading = true;
    this.dataProvider.getRoutes().subscribe({
      next: (data) => { this.routes = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  // --- ABRIR DIÁLOGO ---
  openDialog(route?: any) {
    const dialogRef = this.dialog.open(RouteDialogComponent, {
      width: '500px',
      data: route
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (route) {
          // Editar
          this.dataProvider.updateRoute(route.id, result).subscribe(() => this.loadRoutes());
        } else {
          // Crear
          this.dataProvider.addRoute(result).subscribe(() => this.loadRoutes());
        }
      }
    });
  }

  // --- ELIMINAR ---
  deleteRoute(route: any) {
    if (confirm(`¿Eliminar ruta ${route.nombre}?`)) {
      this.dataProvider.deleteRoute(route.id).subscribe(() => this.loadRoutes());
    }
  }

  // Helper para obtener el origen del string "Origen - Destino"
  getOrigin(name: string): string {
    if (!name) return 'N/A';
    return name.split(' - ')[0] || name;
  }

  // Helper para obtener el destino
  getDestination(name: string): string {
    if (!name) return 'N/A';
    const parts = name.split(' - ');
    return parts.length > 1 ? parts[1] : '';
  }
}