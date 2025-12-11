import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BusesComponent } from './components/buses/buses.component';
import { RoutesComponent } from './components/routes/routes.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent, // El cascarón (Sidebar + Header)
    canActivate: [AuthGuard],
    children: [
      // Si la URL es /dashboard, carga el Overview
      { path: '', component: OverviewComponent },
      
      // Si la URL es /dashboard/buses, carga la Tabla de Combis
      { path: 'buses', component: BusesComponent },
      { path: 'routes', component: RoutesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      
      // Redirecciones útiles
      { path: 'tracking', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }