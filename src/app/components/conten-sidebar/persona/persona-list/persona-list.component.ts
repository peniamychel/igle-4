import {Component, ElementRef, input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {PersonaService} from '../../../../core/services/persona.service';
import {Persona} from '../../../../core/models/persona.model';
import {PersonaDetailComponent} from '../persona-detail/persona-detail.component';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {PersonaFormCrearComponent} from '../persona-form-crear/persona-form-crear.component';
import {PersonaFormEditarComponent} from '../persona-form-editar/persona-form-editar.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatButtonToggle,
    MatSlideToggle,
    MatSlideToggleModule,
    MatRadioGroup,
    MatRadioModule
  ],
  template: `
    <div class="container">
      <div class="nuevoPersona-bucar">
        <button mat-raised-button color="primary" (click)="openCreateDialog()" >
          <mat-icon>add</mat-icon>
          Nueva Persona
        </button>

        <mat-radio-group aria-label="Select an option">
          <mat-radio-button value="1">Option 1</mat-radio-button>
          <mat-radio-button value="2">Option 2</mat-radio-button>
        </mat-radio-group>
<!--        <button mat-raised-button color="primary" (click)="openCreateDialog()">-->
<!--          <mat-icon>add</mat-icon>-->
<!--          Crear Persona-->
<!--        </button>-->

        <mat-form-field appearance="outline">
          <mat-label>Buscar</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Ej. Primera Iglesia" #input>
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>


      <mat-table [dataSource]="personas" matSort class="mat-elevation-z8 demo-table">
        <ng-container matColumnDef="nombre" >
          <mat-header-cell *matHeaderCellDef mat-sort-header > Nombre</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{persona.nombre}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="apellido">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Apellidos</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{persona.apellido}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="celular">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Celular</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{persona.celular}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="direccion">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Dirección</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{persona.direccion}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="fechaNac">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Fecha Nacimiento</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{formatDate(persona.fechaNac)}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="sexo">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Sexo</mat-header-cell>
          <mat-cell *matCellDef="let persona"> {{persona.sexo}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="acciones">
          <mat-header-cell *matHeaderCellDef> Acciones</mat-header-cell>
          <mat-cell *matCellDef="let persona">
            <button mat-icon-button color="primary" (click)="openEditDialog(persona)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button [color]="persona.estado ? 'accent' : 'warn'"
                    (click)="toggleEstado(persona)">
              <mat-icon>{{persona.estado ? 'check_circle' : 'cancel'}}</mat-icon>
            </button>
            <button mat-icon-button color="primary" (click)="openDetailDialog(persona)">
              <mat-icon>visibility</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>

        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="5">No se encontraron datos que coincidan con el filtro "{{input.value}}"</td>
        </tr>
      </mat-table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                     aria-label="Seleccionar página de iglesias">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .nuevoPersona-bucar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .container {
      padding: 20px;
    }

    .mat-table {
      width: 100%;
      margin-top: 20px;
    }

    .mat-cell {
      padding: 8px;
    }





  `]
})
export class PersonaListComponent implements OnInit {
  // personas: Persona[] = [];
  personas = new MatTableDataSource<Persona>([]);
  displayedColumns: string[] = ['nombre', 'apellido', 'celular', 'direccion', 'fechaNac', 'sexo', 'acciones'];

  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<Persona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('input') input!: ElementRef;

  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadPersonas();
  }

  loadPersonas() {
    this.personaService.getPersonas().subscribe(response => {
      this.personas.data = response.datos;
      this.personas.paginator = this.paginator;
      this.personas.sort = this.sort;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PersonaFormCrearComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonas();
      }
    });
  }

  openEditDialog(persona: Persona) {
    const dialogRef = this.dialog.open(PersonaFormEditarComponent, {
      width: '600px',
      data: persona
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonas();
      }
    });
  }

  openDetailDialog(persona: Persona) {
    this.dialog.open(PersonaDetailComponent, {
      width: '600px',
      data: persona
    });
  }

  toggleEstado(persona: Persona) {
    this.personaService.toggleEstado(persona).subscribe(() => {
      this.loadPersonas();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.personas.filter = filterValue.trim().toLowerCase();

    if (this.personas.paginator) {
      this.personas.paginator.firstPage();
    }
  }
}
