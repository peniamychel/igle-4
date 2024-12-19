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
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
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
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonas();
      }
    });
  }

  openEditDialog(persona: Persona) {
    const dialogRef = this.dialog.open(PersonaFormEditarComponent, {
      width: '700px',
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
      width: '700px',
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
