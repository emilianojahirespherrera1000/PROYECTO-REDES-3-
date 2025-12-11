import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataProviderService } from '../../services/data-provider.service';
import { BusDialogComponent } from '../../components/bus-dialog/bus-dialog.component';

@Component({
  selector: 'app-buses',
  standalone: false,
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.scss']
})
export class BusesComponent implements OnInit {
  buses: any[] = [];
  loading = true;

  constructor(
    private dataProvider: DataProviderService,
    private dialog: MatDialog // <--- Inyectar Dialog
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData() {
    this.loading = true;
    this.dataProvider.getBuses().subscribe({
      next: (data) => { this.buses = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  // --- ACCIÓN: ABRIR DIÁLOGO (CREAR/EDITAR) ---
  openDialog(bus?: any) {
    const dialogRef = this.dialog.open(BusDialogComponent, {
      width: '500px',
      data: bus // Si es null es Crear, si tiene datos es Editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (bus) {
          // MODO EDICIÓN
          this.dataProvider.updateBus(bus.id, result).subscribe(() => this.loadData());
        } else {
          // MODO CREACIÓN
          this.dataProvider.addBus(result).subscribe(() => this.loadData());
        }
      }
    });
  }

  // --- ACCIÓN: ELIMINAR ---
  deleteBus(bus: any) {
    if (confirm(`¿Estás seguro de eliminar la unidad ${bus.id}?`)) {
      this.dataProvider.deleteBus(bus.id).subscribe(() => this.loadData());
    }
  }

  // Determina el color del badge según el texto que venga del JSON
  getStatusClass(status: string): string {
    switch (status) {
      case 'Activo': return 'status-active';
      case 'Mantenimiento': return 'status-maintenance';
      case 'Inactivo': return 'status-stopped';
      default: return 'status-stopped';
    }
  }
}