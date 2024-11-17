import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IglesiaService } from '../../../../core/services/iglesia.service';
import { Iglesia } from '../../../../core/models/iglesia.model';
import { IglesiaFormComponent } from '../iglesia-form/iglesia-form.component';
import { IglesiaDetailComponent } from '../iglesia-detail/iglesia-detail.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-iglesia-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './iglesia-list.component.html',
  styleUrls: ['./iglesia-list.component.css']
})
export class IglesiaListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'direccion', 'telefono', 'fechaFundacion', 'acciones'];
  dataSource: MatTableDataSource<Iglesia>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private iglesiaService: IglesiaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Iglesia>([]);
  }

  ngOnInit() {
    this.loadIglesias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadIglesias() {
    this.iglesiaService.getIglesias().subscribe(response => {
      this.dataSource.data = response.datos;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(IglesiaFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIglesias();
        this.snackBar.open(`Iglesia '${result.nombre}' Creada`, 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  openEditDialog(iglesia: Iglesia) {
    const dialogRef = this.dialog.open(IglesiaFormComponent, {
      width: '600px',
      data: iglesia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIglesias();
        this.snackBar.open(`Iglesia '${result.nombre}' Modificada`, 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  openDetailDialog(iglesia: Iglesia) {
    this.dialog.open(IglesiaDetailComponent, {
      width: '600px',
      data: iglesia
    });
  }

  toggleEstado(iglesia: Iglesia) {
    if (iglesia.id) {
      this.iglesiaService.toggleEstado(iglesia.id).subscribe(newEstado => {
        iglesia.estado = newEstado;
        this.snackBar.open(
          `Iglesia '${iglesia.nombre}' ${newEstado ? 'activada' : 'desactivada'}`,
          'Cerrar',
          { duration: 3000 }
        );
      });
    }
  }
}
