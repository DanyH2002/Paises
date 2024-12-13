import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user/interfaces/user';
import { Country } from './countries/interface/country';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
  //URL de servicios
  private urlUsers = 'http://localhost:3000/users'; // node
  private urlCountries = 'http://127.0.0.1:8000/api/country'; // laravel
  private urlEmail = 'http://localhost:5161/api/pipedream/welcome'; // pipedream

  private token: string | null = localStorage.getItem('token');

  // Actualiza el token en la clase y en localStorage
  private updateToken(newToken: string): void {
    this.token = newToken;
    localStorage.setItem('token', newToken);
  }

  constructor(private http: HttpClient) { }

  //* Users
  // Registrar un usuario y enviar correo
  creatUser(user: User): Observable<any> {
    user.id = uuid(); // Generar un UUID para el usuario
    return new Observable(observer => {
      // 1. Registrar el usuario
      this.http.post(`${this.urlUsers}/createUser`, user).subscribe({
        next: (response: any) => {
          // Guardar el token si es devuelto (puedes modificar si el login requiere endpoint separado)
          this.token = response.token || null;

          // 2. Enviar correo de bienvenida
          const emailPayload = {
            Email: user.email,
            UserName: `${user.name} ${user.last_name}`
          };
          this.http.post(this.urlEmail, emailPayload).subscribe({
            next: () => {
              observer.next({ message: 'Usuario registrado y correo enviado correctamente.', response });
              observer.complete();
            },
            error: (emailError) => {
              observer.error({ message: 'Usuario registrado, pero fallo al enviar el correo.', error: emailError });
            }
          });
          console.log('response', user);
          console.log('response', response);
        },
        error: (registrationError) => {
          observer.error({ message: 'Error al registrar usuario.', error: registrationError });
        }
      });
    });
  }


  // Login
  loginUser(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      const loginPayload = { email, password };
      this.http.post(`${this.urlUsers}/login`, loginPayload).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.updateToken(response.token);
            observer.next(response);
            observer.complete();
          } else {
            observer.error({ message: 'No se recibió el token.' });
          }
        },
        error: (loginError) => {
          observer.error({ message: 'Error al iniciar sesión.', error: loginError });
        }
      });
    });
  }


  //* Contries

  // Listar países
  listCountries(): Observable<Country[]> {
    if (!this.token) {
      throw new Error('No se encontró un token de sesión. Inicie sesión primero.');
    }
    return this.http.get<{ status: string; data: Country[] }>(this.urlCountries, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data) // Extrae el array "data"
    );
  }

  // Buscar país por ID
  getCountryById(id: number): Observable<Country> {
    if (!this.token) {
      throw new Error('No se encontró un token de sesión. Inicie sesión primero.');
    }
    return this.http.get<{ status: string; data: Country }>(`${this.urlCountries}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data) // Extraer el objeto "data"
    );
  }

  // Crear un país
  createCountry(country: Country): Observable<Country> {
    if (!this.token) {
      throw new Error('No se encontró un token de sesión. Inicie sesión primero.');
    }

    return this.http.post<{ status: string; message: string }>(this.urlCountries, country, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      map(response => {
        console.log('Respuesta del servidor:', response);  // Depurar la respuesta aquí
        if (response.status === 'success') {
          return country; // Devolver el objeto `country` ya que no viene en `data`
        }
        throw new Error(response.message || 'Error desconocido');
      })
    );
  }



  // Actualizar un país
  updateCountry(id: number, country: Country): Observable<Country> {
    if (!this.token) {
      throw new Error('No se encontró un token de sesión. Inicie sesión primero.');
    }
    return this.http.patch<{ status: string; data: Country }>(`${this.urlCountries}/${id}`, country, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data) // Extraer el objeto "data"
    );
  }


  // Eliminar un país
  deleteCountry(id: number): Observable<any> {
    if (!this.token) {
      throw new Error('No se encontró un token de sesión. Inicie sesión primero.');
    }
    return this.http.delete<{ status: string; message: string }>(`${this.urlCountries}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      map(response => response.message) // Extraer el mensaje de éxito
    );
  }
}
