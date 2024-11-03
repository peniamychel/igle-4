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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IglesiaService } from '../../../../core/services/iglesia.service';
import { Iglesia } from '../../../../core/models/iglesia.model';
import {catchError, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-iglesia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule
  ],
  templateUrl: './iglesia-form.component.html',
  styleUrls: ['./iglesia-form.component.css']
})
export class IglesiaFormComponent implements OnInit {
  iglesiaForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private iglesiaService: IglesiaService,
    private dialogRef: MatDialogRef<IglesiaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Iglesia
  ) {
    this.iglesiaForm = this.fb.group({
      nombre: ['', [Validators.required], [this.nombreValidator.bind(this)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editMode = true;
      this.iglesiaForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.iglesiaForm.valid) {
      let iglesiaData = this.iglesiaForm.value;

      if (this.editMode) {
        // iglesiaData.id = this.data.id;
        iglesiaData = { ...this.data, ...this.iglesiaForm.value };
        this.iglesiaService.updateIglesia(iglesiaData).subscribe(() => {
          this.dialogRef.close(iglesiaData);
        });
      } else {
        this.iglesiaService.createIglesia(iglesiaData).subscribe(() => {
          this.dialogRef.close(iglesiaData);
        });
      }
    }
  }

  /*valida nombre de iglesia si ya existe*/
  nombreValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.iglesiaService.buscarNombreIglesia(control.value).pipe(
      map(iglesia => {
        return iglesia ? {nameExists: true} : null;
      }),
      catchError(() => of(null)) // Si hay un error en la solicitud, no marcará error
    );
  }


  getErrorMessageNombre(controlName: string): string {
    const control = this.iglesiaForm.get(controlName);

    if (control?.hasError('required')) {
      return 'El nombre de la iglesia es requerido';
    }
    if (control?.hasError('nameExists')) {
      return 'El nombre de la iglesia ya se encuentra registrado';
    }
    return '';
  }

  getErrorMessageDireccion(controlName: string): string {
    const control = this.iglesiaForm.get(controlName);
    if (control?.hasError('required')) {
      return 'La direccion es requerida';
    }
    return '';
  }
  getErrorMessageTelefono(controlName: string): string {
    const control = this.iglesiaForm.get(controlName);
    if (control?.hasError('required')) {
      return 'El telefono es requerido';
    }
    if (control?.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    return '';
  }

}
