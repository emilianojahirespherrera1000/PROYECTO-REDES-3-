import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox'; // AGREGADO

// Routing
import { AppRoutingModule } from './app.routes';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

// Bus Components
import { BusListComponent } from './components/buses/bus-list/bus-list.component';
import { BusDetailComponent } from './components/buses/bus-detail/bus-detail.component';
import { BusTrackingComponent } from './components/buses/bus-tracking/bus-tracking.component';

// Route Components
import { RouteListComponent } from './components/routes/route-list/route-list.component';
import { RouteDetailComponent } from './components/routes/route-detail/route-detail.component';

// Stop Components
import { StopListComponent } from './components/stops/stop-list/stop-list.component';
import { StopDetailComponent } from './components/stops/stop-detail/stop-detail.component';

// User Components
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';

// Report Components
import { SystemLogsComponent } from './components/reports/system-logs/system-logs.component';
import { AnalyticsComponent } from './components/reports/analytics/analytics.component';

// Replication Components
import { ReplicationStatusComponent } from './components/replication/replication-status/replication-status.component';

// Services
import { AuthService } from './services/auth.service';
import { BusService } from './services/bus.service';
import { RouteService } from './services/route.service';
import { StopService } from './services/stop.service';
import { UserService } from './services/user.service';
import { ReplicationService } from './services/replication.service';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    BusListComponent,
    BusDetailComponent,
    BusTrackingComponent,
    RouteListComponent,
    RouteDetailComponent,
    StopListComponent,
    StopDetailComponent,
    UserListComponent,
    UserDetailComponent,
    SystemLogsComponent,
    AnalyticsComponent,
    ReplicationStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule // AGREGADO
  ],
  providers: [
    AuthGuard, // AGREGADO
    AuthService,
    BusService,
    RouteService,
    StopService,
    UserService,
    ReplicationService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }