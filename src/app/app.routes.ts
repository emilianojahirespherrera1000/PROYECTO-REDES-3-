import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BusListComponent } from './components/buses/bus-list/bus-list.component';
import { BusDetailComponent } from './components/buses/bus-detail/bus-detail.component';
import { BusTrackingComponent } from './components/buses/bus-tracking/bus-tracking.component';
import { RouteListComponent } from './components/routes/route-list/route-list.component';
import { RouteDetailComponent } from './components/routes/route-detail/route-detail.component';
import { StopListComponent } from './components/stops/stop-list/stop-list.component';
import { StopDetailComponent } from './components/stops/stop-detail/stop-detail.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { SystemLogsComponent } from './components/reports/system-logs/system-logs.component';
import { AnalyticsComponent } from './components/reports/analytics/analytics.component';
import { ReplicationStatusComponent } from './components/replication/replication-status/replication-status.component';

export const routes: Routes = [
  // Redirigir raíz a login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Ruta de login (sin protección)
  { path: 'login', component: LoginComponent },
  
  // Dashboard protegido con AuthGuard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protección con guard
    children: [
      { path: '', redirectTo: 'tracking', pathMatch: 'full' }, // Ruta por defecto del dashboard
      { path: 'buses', component: BusListComponent },
      { path: 'buses/:id', component: BusDetailComponent },
      { path: 'tracking', component: BusTrackingComponent },
      { path: 'routes', component: RouteListComponent },
      { path: 'routes/:id', component: RouteDetailComponent },
      { path: 'stops', component: StopListComponent },
      { path: 'stops/:id', component: StopDetailComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'logs', component: SystemLogsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'replication', component: ReplicationStatusComponent }
    ]
  },
  
  // Cualquier ruta no encontrada redirige a login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }