import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PersonaService } from '../../../../core/services/persona.service';
import { Persona } from '../../../../core/models/persona.model';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {catchError, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioButton,
    MatRadioGroup
  ],
  template: `
      <h2 mat-dialog-title>{{editMode ? 'Editar' : 'Crear'}} Persona</h2>
      <form [formGroup]="personaForm" (ngSubmit)="onSubmit()">
          <mat-dialog-content>
              <mat-form-field appearance="fill">
                  <mat-label>Nombre</mat-label>
                  <input matInput formControlName="nombre">
              </mat-form-field>

              <mat-form-field appearance="fill">
                  <mat-label>Apellido</mat-label>
                  <input matInput formControlName="apellido">
              </mat-form-field>

              <mat-form-field appearance="fill">
                  <mat-label>CI</mat-label>
                  <input matInput formControlName="ci">
              </mat-form-field>

              <mat-form-field appearance="fill">
                  <mat-label>Fecha de Nacimiento</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="fechaNac">
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>

              <mat-radio-group aria-label="Selecione el sexo" appearance="fill" formControlName="sexo">
                  <mat-label>Sexo:</mat-label>
                  <mat-radio-button value="Masculino">Masculino</mat-radio-button>
                  <mat-radio-button value="Femenino">Femenino</mat-radio-button>
              </mat-radio-group>

              <mat-form-field appearance="fill">
                  <mat-label>Celular</mat-label>
                  <input matInput>
              </mat-form-field>

              <mat-form-field appearance="fill">
                  <mat-label>Dirección</mat-label>
                  <input matInput formControlName="direccion">
              </mat-form-field>

              <mat-form-field appearance="fill">
                  <mat-label>URI Foto</mat-label>
                  <input matInput formControlName="uriFoto">
              </mat-form-field>
          </mat-dialog-content>

          <mat-dialog-actions align="end">
              <button mat-button mat-dialog-close>Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!personaForm.valid">
                  {{editMode ? 'Actualizar' : 'Crear'}}
              </button>
          </mat-dialog-actions>
      </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class PersonaFormEditarComponent implements OnInit {
  personaForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private dialogRef: MatDialogRef<PersonaFormEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(3)]],
      ci: ['', [Validators.required]],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  ciValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.personaService.buscarCi(control.value).pipe(
      map(persona => {
        return persona ? { ciExists: true } : null;
      }),
      catchError(() => of(null)) // Si hay un error en la solicitud, no marcará error
    );
  }

  ngOnInit() {
    if (this.data) {
      this.editMode = true;
      this.personaForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.personaForm.valid) {
      const persona = {
        ...this.data,
        ...this.personaForm.value
      }

      if (this.editMode) {

        this.personaService.updatePersona(persona).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.personaService.createPersona(persona).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
