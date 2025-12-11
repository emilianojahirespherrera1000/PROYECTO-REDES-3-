import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataProviderService } from '../../services/data-provider.service';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(
    private dataProvider: DataProviderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers() {
    this.loading = true;
    this.dataProvider.getUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  openDialog(user?: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          this.dataProvider.updateUser(user.id, result).subscribe(() => this.loadUsers());
        } else {
          this.dataProvider.addUser(result).subscribe(() => this.loadUsers());
        }
      }
    });
  }

  deleteUser(user: any) {
    if (confirm(`¿Eliminar usuario ${user.username}?`)) {
      this.dataProvider.deleteUser(user.id).subscribe(() => this.loadUsers());
    }
  }
  // --- HELPERS VISUALES ---

  // Obtiene la primera letra del email para el avatar
  getInitials(email: string): string {
    return email ? email.charAt(0).toUpperCase() : '?';
  }

  // Asigna color de fondo al avatar según el rol
  getAvatarColor(role: string): string {
    switch (role) {
      case 'Super Admin': return 'bg-purple';
      case 'Gerente': return 'bg-blue';
      default: return 'bg-teal';
    }
  }

  // Asigna estilo al badge del rol
  getRoleClass(role: string): string {
    switch (role) {
      case 'Super Admin': return 'role-admin';
      case 'Gerente': return 'role-manager';
      default: return 'role-support';
    }
  }

  // Asigna icono al rol
  getRoleIcon(role: string): string {
    switch (role) {
      case 'Super Admin': return 'verified_user';
      case 'Gerente': return 'manage_accounts';
      default: return 'headset_mic';
    }
  }
}