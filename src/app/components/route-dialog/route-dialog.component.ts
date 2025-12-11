import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-route-dialog',
  standalone: false,
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.scss'] // Reutilizaremos estilos si quieres
})
export class RouteDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RouteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      origin: ['', Validators.required],     // Campo separado
      destination: ['', Validators.required],// Campo separado
      distancia: ['', Validators.required],
      tiempo_promedio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      // Si editamos, "desarmamos" el nombre: "Penal - Centro"
      const parts = (this.data.nombre || '').split(' - ');

      this.form.patchValue({
        id: this.data.id,
        origin: parts[0] || '',
        destination: parts[1] || '',
        distancia: this.data.distancia,
        tiempo_promedio: this.data.tiempo_promedio
      });

      this.form.get('id')?.disable();
    }
  }

  save() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      // Armamos el objeto final para el backend
      const finalRoute = {
        id: raw.id,
        nombre: `${raw.origin} - ${raw.destination}`, // <--- UNIÓN AQUÍ
        distancia: raw.distancia,
        tiempo_promedio: raw.tiempo_promedio
      };

      this.dialogRef.close(finalRoute);
    }
  }
}