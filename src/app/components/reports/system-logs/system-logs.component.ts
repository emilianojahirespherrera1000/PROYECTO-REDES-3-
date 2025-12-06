import { Component } from '@angular/core';

@Component({
  selector: 'app-system-logs',
  standalone: false, // <--- FALTABA ESTA LÍNEA
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.scss']
})
export class SystemLogsComponent {}
