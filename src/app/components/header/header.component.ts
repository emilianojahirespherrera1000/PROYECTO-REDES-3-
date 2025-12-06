import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false, // <--- OBLIGATORIO
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  showNotifications = false;
  unreadCount = 3;
  notifications: any[] = [
    { id: 1, type: 'success', message: 'Combi #A-107 conectada', time: 'Hace 2 min', read: false }
  ];

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {}

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead(): void {
    this.unreadCount = 0;
  }
  
  markAsRead(notification: any): void {
    notification.read = true;
  }

  getNotificationIcon(type: string): string {
    return type === 'success' ? 'check_circle' : 'notifications';
  }

  getNotificationClass(type: string): string {
    return `notification-${type}`;
  }
}