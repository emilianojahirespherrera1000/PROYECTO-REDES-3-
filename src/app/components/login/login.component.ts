import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false, // <--- OBLIGATORIO
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Aquí irá tu lógica de login
  constructor() {}
}