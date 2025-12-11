import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // <--- Importa NavigationEnd
import { filter } from 'rxjs/operators'; // <--- Importa filter

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: any[] = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', route: '/dashboard', color: 'blue' },
    { id: 'buses', icon: 'directions_bus', label: 'Gestión Combis', route: '/dashboard/buses', color: 'red' },
    { id: 'routes', icon: 'route', label: 'Rutas', route: '/dashboard/routes', color: 'blue' },
    { id: 'users', icon: 'people', label: 'Usuarios', route: '/dashboard/users', color: 'blue' },
    { id: 'settings', icon: 'settings', label: 'Configuración', route: '/dashboard/settings', color: 'blue' }
  ];

  activeRoute = 'dashboard';

  constructor(private router: Router) {
    // CORRECCIÓN: Usamos pipe y filter para escuchar solo cuando termina la navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateActiveItem(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    // Checar ruta inicial al cargar
    this.updateActiveItem(this.router.url);
  }

  private updateActiveItem(url: string): void {
    // LÓGICA CORREGIDA:
    
    // 1. Caso especial: Si es exactamente '/dashboard', activamos dashboard
    if (url === '/dashboard' || url === '/dashboard/') {
      this.activeRoute = 'dashboard';
      return;
    }

    // 2. Para los demás, buscamos coincidencia EXACTA de la ruta o que incluya el ID
    // pero ignorando el ID 'dashboard' para evitar falsos positivos
    const activeItem = this.menuItems.find(item => 
      item.id !== 'dashboard' && url.includes(item.route)
    );

    if (activeItem) {
      this.activeRoute = activeItem.id;
    } else {
      // Si no coincide con ninguno específico, por defecto dashboard
      this.activeRoute = 'dashboard';
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  navigateTo(route: string, id: string): void {
    this.activeRoute = id;
    this.router.navigate([route]);
  }

  isActive(id: string): boolean {
    return this.activeRoute === id;
  }
}