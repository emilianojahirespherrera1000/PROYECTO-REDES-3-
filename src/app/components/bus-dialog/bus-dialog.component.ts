import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataProviderService } from '../../services/data-provider.service'; // <--- IMPORTAR SERVICIO

@Component({
  selector: 'app-bus-dialog',
  standalone: false,
  templateUrl: './bus-dialog.component.html',
  styleUrls: ['./bus-dialog.component.scss']
})
export class BusDialogComponent implements OnInit {
  form: FormGroup;
  availableRoutes: any[] = []; // <--- LISTA PARA GUARDAR LAS RUTAS

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BusDialogComponent>,
    private dataProvider: DataProviderService, // <--- INYECTAR SERVICIO
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      chofer: ['', Validators.required],
      routeId: ['', Validators.required], // Quitamos el valor por defecto fijo
      status: ['Activo', Validators.required]
    });
  }

  ngOnInit(): void {
    // 1. CARGAR RUTAS DISPONIBLES DESDE EL BACKEND
    this.dataProvider.getRoutes().subscribe({
      next: (routes) => {
        this.availableRoutes = routes;
        
        // Si no hay ruta seleccionada (es nuevo), seleccionar la primera por defecto
        if (!this.data && routes.length > 0) {
          this.form.patchValue({ routeId: routes[0].id });
        }
      },
      error: (err) => console.error('Error cargando rutas', err)
    });

    // 2. LLENAR DATOS SI ES EDICIÓN
    if (this.data) {
      this.form.patchValue(this.data);
      this.form.get('id')?.disable();
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}