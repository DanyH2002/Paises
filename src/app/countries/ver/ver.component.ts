import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServicesService } from '../../http-services.service';
import { Country } from '../interface/country';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent implements OnInit {
  country: Country | undefined;
  id: number | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpServicesService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getCountryById(this.id);
      }
    });
  }

  getCountryById(id: number): void {
    this.httpService.getCountryById(id).subscribe(
      (data: Country) => {
        this.country = data;
      },
      (error) => {
        console.error('Error al obtener el país:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los detalles del país.',
          icon: 'error',
        });
        this.router.navigate(['/countries']);
      }
    );
  }

  editar() {
    this.router.navigate(['countries/updateCountry', this.id]);
  }


  eliminar(): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este país?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && this.id) {
        this.httpService.deleteCountry(this.id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado con éxito',
            }).then(() => {
              this.router.navigate(['/countries']);
            });
          },
          (error) => {
            console.error('Error al eliminar el país:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el país.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
