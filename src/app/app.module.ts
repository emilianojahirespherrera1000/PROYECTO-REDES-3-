import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <--- VITAL PARA CONECTAR CON JAVA
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <--- VITAL PARA MATERIAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

// --- Módulos de Angular Material (Diseño) ---
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card'; // Opcional, para tarjetas bonitas
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';             
import { MatFormFieldModule } from '@angular/material/form-field';    
import { MatCheckboxModule } from '@angular/material/checkbox';       
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; 

// --- Tus Componentes ---
import { OverviewComponent } from './components/overview/overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Ajusta ruta si es necesario
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BusesComponent } from './components/buses/buses.component';
import { RoutesComponent } from './components/routes/routes.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { BusDialogComponent } from './components/bus-dialog/bus-dialog.component';
import { RouteDialogComponent } from './components/route-dialog/route-dialog.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    // Aquí van TODOS tus componentes
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    OverviewComponent,
    BusesComponent,
    RoutesComponent,
    UsersComponent,
    SettingsComponent,
    BusDialogComponent,
    RouteDialogComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,       // Permite hacer peticiones HTTP al Backend
    BrowserAnimationsModule, // Hace que las animaciones de Material funcionen
    FormsModule,           // Para [(ngModel)] en el buscador del header
    ReactiveFormsModule,
    
    // Material Design
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatBadgeModule,
    MatInputModule,           // <--- NUEVO
    MatFormFieldModule,       // <--- NUEVO
    MatCheckboxModule,        // <--- NUEVO
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }