import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MiembroService } from '../../../../core/services/miembro.service';
import { Miembro } from '../../../../core/models/miembro.model';
import { MiembroFormCrearComponent} from '../miembro-form-crear/miembro-form.component';
import { MiembroDetailComponent } from '../miembro-detail/miembro-detail.component';
import {MiembroFormEditarComponent} from '../miembro-form-editar/miembro-form.component';

@Component({
  selector: 'app-miembro-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],

  templateUrl: './miembro-list.component.html',
  styleUrls: ['./miembro-list.component.css']

})
export class MiembroListComponent implements OnInit {
  miembros: Miembro[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'celular', 'direccion', 'fechaConvercion', 'sexo', 'acciones'];

  constructor(
    private miembroService: MiembroService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMiembros();
  }

  loadMiembros() {
    this.miembroService.getMiembros().subscribe(response => {
      this.miembros = response.datos;
    });
  }

  formatDate(date: Date | null | undefined): string {
    if (!date) return 'No definido';
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(MiembroFormCrearComponent, {
      width: '600px !important'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMiembros();
      }
    });
  }

  openEditDialog(miembro: Miembro) {
    const dialogRef = this.dialog.open(MiembroFormEditarComponent, {
      width: '600px !important',
      data: miembro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMiembros();
      }
    });
  }

  openDetailDialog(miembro: Miembro) {
    this.dialog.open(MiembroDetailComponent, {
      width: '600px !important',
      data: miembro
    });
  }

  toggleEstado(miembro: Miembro) {
    if (miembro.id) {
      this.miembroService.toggleEstado(miembro.id).subscribe(() => {
        this.loadMiembros();
      });
    }
  }
}
