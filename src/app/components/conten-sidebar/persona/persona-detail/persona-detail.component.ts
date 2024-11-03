import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Persona } from '../../../../core/models/persona.model';

@Component({
  selector: 'app-persona-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Detalles de la Persona</h2>
    <mat-dialog-content>
      <div class="detail-item">
        <strong>Nombre:</strong> {{data.nombre}}
      </div>
      <div class="detail-item">
        <strong>Apellido:</strong> {{data.apellido}}
      </div>
      <div class="detail-item">
        <strong>CI:</strong> {{data.ci}}
      </div>
      <div class="detail-item">
        <strong>Fecha de Nacimiento:</strong> {{formatDate(data.fechaNac)}}
      </div>
      <div class="detail-item">
        <strong>Celular:</strong> {{data.celular}}
      </div>
      <div class="detail-item">
        <strong>Sexo:</strong> {{data.sexo}}
      </div>
      <div class="detail-item">
        <strong>Dirección:</strong> {{data.direccion}}
      </div>
      <div class="detail-item">
        <strong>Estado:</strong> {{data.estado ? 'Activo' : 'Inactivo'}}
      </div>
<!--      <div class="detail-item">-->
<!--        <strong>Creado:</strong> {{formatDate(data.createdAt)}}-->
<!--      </div>-->
<!--      <div class="detail-item">-->
<!--        <strong>Actualizado:</strong> {{formatDate(data.updatedAt)}}-->
<!--      </div>-->
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .detail-item {
      margin-bottom: 12px;
    }
    strong {
      font-weight: 500;
      margin-right: 8px;
    }
  `]
})
export class PersonaDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {}

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
