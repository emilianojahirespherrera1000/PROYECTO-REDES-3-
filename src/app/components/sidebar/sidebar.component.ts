import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false, // <--- OBLIGATORIO
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: any[] = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', route: '/dashboard', color: 'blue' },
    { id: 'buses', icon: 'directions_bus', label: 'Gestión Combis', route: '/dashboard/buses', color: 'red' },
    { id: 'routes', icon: 'route', label: 'Rutas', route: '/dashboard/routes', color: 'blue' },
    { id: 'stops', icon: 'place', label: 'Paradas', route: '/dashboard/stops', color: 'red' },
    { id: 'users', icon: 'people', label: 'Usuarios', route: '/dashboard/users', color: 'blue' },
    { id: 'tracking', icon: 'my_location', label: 'Tracking Live', route: '/dashboard/tracking', color: 'red' },
    { id: 'replication', icon: 'storage', label: 'Replicación', route: '/dashboard/replication', color: 'blue' },
    { id: 'logs', icon: 'description', label: 'Logs Sistema', route: '/dashboard/logs', color: 'red' },
    { id: 'settings', icon: 'settings', label: 'Configuración', route: '/dashboard/settings', color: 'blue' }
  ];

  activeRoute = 'dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      const activeItem = this.menuItems.find(item => currentRoute.includes(item.id));
      if (activeItem) {
        this.activeRoute = activeItem.id;
      }
    });
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