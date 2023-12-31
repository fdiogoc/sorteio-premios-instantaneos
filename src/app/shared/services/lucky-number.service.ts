import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LuckyNumber } from '../models/lucky-number';
import { API_BASE_URL } from './api.config';
@Injectable({
  providedIn: 'root'
})
export class LuckyNumberService
{
  apiUrl = `${API_BASE_URL}/numeros_sorte`;
  cpf!: string;

  constructor(private http: HttpClient, private authService: AuthService)
  {
    this.cpf = this.authService.getUserCPF();
  }

  fetchLuckyNumbers(): Observable<LuckyNumber[]>
  {
    const apiUrl = `${this.apiUrl}?cpf=${this.cpf}`;
    return this.http.get<LuckyNumber[]>(apiUrl);
  }

  updateNumero(numberId: number): Observable<any>
  {
    const dataToUpdate = { premio_instataneo_disponivel: false };
    const url = `${this.apiUrl}/${numberId}`;
    return this.http.patch(url, dataToUpdate);
  }
}
