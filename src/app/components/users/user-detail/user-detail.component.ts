import { Component } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  standalone: false, // <--- FALTABA ESTA LÍNEA
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {}
