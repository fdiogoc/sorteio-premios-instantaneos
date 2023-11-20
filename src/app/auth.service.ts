import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  get isLoggedIn()
  {
    return this.isAuthenticated.asObservable();
  }

  login(username: string, password: string): Observable<boolean>
  {
    return this.http.get<any[]>(`${this.apiUrl}?cpf=${username}&password=${password}`)
      .pipe(
        map(users =>
        {
          const user = users[0];
          if (user)
          {
            this.isAuthenticated.next(true);
            this.salvarDadosUsuario(user);
            return true;
          }
          else
          {
            return false;
          }
        })
      );
  }
  register(formData: any): Observable<boolean>
  {
    return this.http.post<any>(`${this.apiUrl}`, formData)
      .pipe(
        map(response =>
        {
          // Handle the registration response here
          if (response)
          {
            // Registration was successful
            return true;
          } else
          {
            // Registration failed
            return false;
          }
        })
      );
  }
  private salvarDadosUsuario(user: any): void
  {
    const { password, ...dadosSegurosUsuario } = user;
    localStorage.setItem('usuario', JSON.stringify(dadosSegurosUsuario));
  }
  getUserCPF(): string
  {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString)
    {
      const usuario = JSON.parse(usuarioString);
      return usuario.cpf || '';
    }
    return '';
  }
  logout(): void
  {
    localStorage.removeItem('usuario');
    this.isAuthenticated.next(false);
  }


}
