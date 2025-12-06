import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: false, // <--- FALTABA ESTA LÍNEA
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {}