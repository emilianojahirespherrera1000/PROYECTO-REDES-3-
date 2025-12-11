import { Component } from '@angular/core';
import { ReplicationService } from '../../services/replication.service';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  loading = false;
  consoleMessage: string = '';
  isError = false;

  constructor(private replicationService: ReplicationService) {}

  executeAction(action: string) {
    this.loading = true;
    this.consoleMessage = 'Procesando comando en servidor distribuido...';
    this.isError = false;

    switch (action) {
      case 'reset':
        this.replicationService.resetSimulation().subscribe({
          next: (res) => this.handleSuccess(res),
          error: (err) => this.handleError(err)
        });
        break;

      case 'seed':
        this.replicationService.seedDatabase().subscribe({
          next: (res) => this.handleSuccess(res),
          error: (err) => this.handleError(err)
        });
        break;

      case 'security':
        if (confirm('⚠️ ¿Estás seguro? Esto cambiará las llaves RSA y deberás reiniciar el servidor Java manualmente.')) {
          this.replicationService.upgradeSecurity().subscribe({
            next: (res) => this.handleSuccess(res),
            error: (err) => this.handleError(err)
          });
        } else {
          this.loading = false;
          this.consoleMessage = '';
        }
        break;
    }
  }

  private handleSuccess(message: string) {
    this.loading = false;
    this.consoleMessage = `> ÉXITO: ${message}`;
    
    // Auto-limpiar mensaje después de 5 seg
    setTimeout(() => this.consoleMessage = '', 5000);
  }

  private handleError(error: any) {
    this.loading = false;
    this.isError = true;
    this.consoleMessage = `> ERROR: No se pudo conectar con el Backend. ${error.statusText || ''}`;
  }
}