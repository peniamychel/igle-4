import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Persona, PersonaResponse } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = `${environment.apiUrl}/api/persona/v1`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPersonas(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(`${this.apiUrl}/findall`, { headers: this.getHeaders() });
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/showbyid/${id}`, { headers: this.getHeaders() });
  }

  createPersona(persona: Persona): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, persona, { headers: this.getHeaders() });
  }

  updatePersona(persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, persona, { headers: this.getHeaders() });
  }

  toggleEstado(persona: Persona): Observable<any> {
    const updatedPersona = { ...persona, estado: !persona.estado };
    return this.updatePersona(updatedPersona);
  }

  personaNoMiembro(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(`${this.apiUrl}/personanomiembro`, { headers: this.getHeaders() });
  }

  buscarCi(ci: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/showbyci/${ci}`, { headers: this.getHeaders() });
  }
}
