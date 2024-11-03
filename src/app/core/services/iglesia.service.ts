import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Iglesia, IglesiaResponse, IglesiaDetail } from '../models/iglesia.model';
import {Persona} from '../models/persona.model';


@Injectable({
  providedIn: 'root'
})
export class IglesiaService {
  private apiUrl = `${environment.apiUrl}/api/iglesia/v1`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getIglesias(): Observable<IglesiaResponse> {
    return this.http.get<IglesiaResponse>(`${this.apiUrl}/findall`, { headers: this.getHeaders() });
  }

  getIglesiaById(id: number): Observable<IglesiaDetail> {
    return this.http.get<IglesiaDetail>(`${this.apiUrl}/showbyid/${id}`, { headers: this.getHeaders() });
  }

  createIglesia(iglesia: Iglesia): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, iglesia, { headers: this.getHeaders() });
  }

  updateIglesia(iglesia: Iglesia): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, iglesia, { headers: this.getHeaders() });
  }

  toggleEstado(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/estado/${id}`, {}, { headers: this.getHeaders() });
  }

  /*busca el nombre de una igleia si ya existe*/
  buscarNombreIglesia(nameIglesia: string): Observable<Iglesia> {
    return this.http.get<Iglesia>(`${this.apiUrl}/showbynombreiglesia/${nameIglesia}`, { headers: this.getHeaders() });
  }

}
