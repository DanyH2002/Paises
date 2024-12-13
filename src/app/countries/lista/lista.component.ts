import { Component } from '@angular/core';
import { HttpServicesService } from '../../http-services.service';
import { Country } from '../interface/country';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  country: Country[] = [];

  constructor(private httpService: HttpServicesService) {
    this.httpService.listCountries().subscribe({
      next: (data: Country[]) => {
        if (Array.isArray(data)) {
          this.country = data;
        } else {
          console.error('La respuesta no es un array:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener países:', err);
      }
    });
  }
}
