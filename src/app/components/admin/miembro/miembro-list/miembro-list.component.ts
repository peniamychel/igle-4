import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MiembroService } from '../../../../core/services/miembro.service';
import { Miembro } from '../../../../core/models/miembro.model';
import { MiembroFormCrearComponent} from '../miembro-form-crear/miembro-form.component';
import { MiembroDetailComponent } from '../miembro-detail/miembro-detail.component';
import {MiembroFormEditarComponent} from '../miembro-form-editar/miembro-form.component';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Persona} from '../../../../core/models/persona.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

@Component({
  selector: 'app-miembro-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatPaginator,
    MatSort,
    MatSortHeader
  ],

  templateUrl: './miembro-list.component.html',
  styleUrls: ['./miembro-list.component.css']

})
export class MiembroListComponent implements OnInit {
  miembros = new MatTableDataSource<Miembro>([]);
  miembros2: Miembro[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'celular', 'direccion', 'fechaConvercion', 'sexo', 'acciones'];

  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<Persona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('input') input!: ElementRef;

  constructor(
    private miembroService: MiembroService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMiembros();
  }

  loadMiembros() {
    this.miembroService.getMiembros().subscribe(response => {
      this.miembros.data = response.datos;
      this.miembros.paginator = this.paginator;
      this.miembros.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.miembros.filter = filterValue.trim().toLowerCase();

    if (this.miembros.paginator) {
      this.miembros.paginator.firstPage();
    }
  }
}
