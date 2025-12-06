import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface ReplicationStatus {
  nfsServer: ServerStatus;
  hdfsServer: ServerStatus;
  googleDrive: CloudStatus;
  lastSync: Date;
  syncStatus: 'synced' | 'syncing' | 'error' | 'delayed';
}

export interface ServerStatus {
  ip: string;
  status: 'online' | 'offline' | 'warning';
  uptime: number;
  diskUsage: number;
  lastUpdate: Date;
  responseTime: number;
}

export interface CloudStatus {
  status: 'synced' | 'syncing' | 'error';
  lastSync: Date;
  storageUsed: number;
  storageTotal: number;
  filesCount: number;
}

export interface FileReplication {
  fileName: string;
  size: number;
  status: 'synced' | 'pending' | 'error';
  locations: {
    nfs: boolean;
    hdfs: boolean;
    drive: boolean;
  };
  lastModified: Date;
  encrypted: boolean;
}

export interface SyncLog {
  id: string;
  timestamp: Date;
  action: 'sync' | 'backup' | 'restore' | 'delete';
  fileName: string;
  source: string;
  destination: string;
  status: 'success' | 'failed' | 'warning';
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReplicationService {
  private apiUrl = 'http://192.168.1.107:8080/api'; // App Server IP

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Replication Status
  getReplicationStatus(): Observable<ReplicationStatus> {
    return this.http.get<ReplicationStatus>(`${this.apiUrl}/replication/status`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Server Status
  getNFSServerStatus(): Observable<ServerStatus> {
    return this.http.get<ServerStatus>(`${this.apiUrl}/replication/nfs/status`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getHDFSServerStatus(): Observable<ServerStatus> {
    return this.http.get<ServerStatus>(`${this.apiUrl}/replication/hdfs/status`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getGoogleDriveStatus(): Observable<CloudStatus> {
    return this.http.get<CloudStatus>(`${this.apiUrl}/replication/drive/status`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // File Management
  getReplicatedFiles(): Observable<FileReplication[]> {
    return this.http.get<FileReplication[]>(`${this.apiUrl}/replication/files`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getFileStatus(fileName: string): Observable<FileReplication> {
    return this.http.get<FileReplication>(`${this.apiUrl}/replication/files/${fileName}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Sync Operations
  triggerManualSync(): Observable<any> {
    return this.http.post(`${this.apiUrl}/replication/sync`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  syncToNFS(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/replication/sync/nfs`, { fileName }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  syncToHDFS(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/replication/sync/hdfs`, { fileName }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  syncToGoogleDrive(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/replication/sync/drive`, { fileName }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Backup & Restore
  createBackup(): Observable<any> {
    return this.http.post(`${this.apiUrl}/replication/backup`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  restoreFromBackup(backupId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/replication/restore`, { backupId }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getBackupHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/replication/backups`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Sync Logs
  getSyncLogs(limit: number = 50): Observable<SyncLog[]> {
    return this.http.get<SyncLog[]>(`${this.apiUrl}/replication/logs`, {
      params: { limit: limit.toString() },
      headers: this.authService.getAuthHeaders()
    });
  }

  getLogsByDate(startDate: Date, endDate: Date): Observable<SyncLog[]> {
    return this.http.get<SyncLog[]>(`${this.apiUrl}/replication/logs/date`, {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      headers: this.authService.getAuthHeaders()
    });
  }

  getErrorLogs(): Observable<SyncLog[]> {
    return this.http.get<SyncLog[]>(`${this.apiUrl}/replication/logs/errors`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Encryption
  encryptFile(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/replication/encrypt`, { fileName }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  decryptFile(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/replication/decrypt`, { fileName }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Health Check
  performHealthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/replication/health`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Configuration
  getReplicationConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/replication/config`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateReplicationConfig(config: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/replication/config`, config, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Test Connections
  testNFSConnection(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/replication/test/nfs`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  testHDFSConnection(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/replication/test/hdfs`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  testGoogleDriveConnection(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/replication/test/drive`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Real-time monitoring
  startRealtimeMonitoring(): Observable<ReplicationStatus> {
    return interval(10000) // Actualizar cada 10 segundos
      .pipe(
        switchMap(() => this.getReplicationStatus())
      );
  }

  // Storage Analytics
  getStorageAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/replication/analytics/storage`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getSyncPerformance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/replication/analytics/performance`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}