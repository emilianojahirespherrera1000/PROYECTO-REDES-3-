import { Component } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  standalone: false, // <--- FALTABA ESTA LÍNEA
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss']
})
export class StopListComponent {}
