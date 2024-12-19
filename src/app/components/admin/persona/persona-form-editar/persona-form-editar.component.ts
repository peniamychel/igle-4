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
import {MatIcon} from '@angular/material/icon';

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
    MatRadioGroup,
    MatIcon
  ],
  templateUrl: './persona-form-editar.component.html',
  styleUrls: ['./persona-form-editar.component.css']
})
export class PersonaFormEditarComponent implements OnInit {
  personaForm: FormGroup;
  editMode = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private dialogRef: MatDialogRef<PersonaFormEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'), Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'), Validators.minLength(3)]],
      ci: ['', [Validators.required]],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required]
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
