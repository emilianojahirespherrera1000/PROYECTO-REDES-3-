import { Component } from '@angular/core';

@Component({
  selector: 'app-stop-detail',
  standalone: false, // <--- FALTABA ESTA LÍNEA
  templateUrl: './stop-detail.component.html',
  styleUrls: ['./stop-detail.component.scss']
})
export class StopDetailComponent {}
