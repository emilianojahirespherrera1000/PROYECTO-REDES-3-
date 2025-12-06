import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false, // <--- OBLIGATORIO
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RutaSmart Admin';
}