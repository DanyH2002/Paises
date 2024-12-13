import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../interface/country';
import { HttpServicesService } from '../../http-services.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit {
  // Variable para almacenar el id del país que es un número
  id: number = 0;

  country: Country | undefined;

  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private activate: ActivatedRoute,
    private httpServices: HttpServicesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      region: ['', [Validators.required]],
      population: ['', [Validators.required, Validators.min(1)]],
      president_elect: ['', [Validators.required], Validators.maxLength(100)],
      size: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token de sesión. Inicie sesión primero.');
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el id del país de la ruta
    this.activate.params.subscribe((params) => {
      this.id = +params['id']; // Convierte a número
      if (this.id && this.id > 0) {
        // Si hay un id válido, se está editando un país
        this.httpServices.getCountryById(this.id).subscribe({
          next: (country: Country) => {
            console.log('Country data:', country); // Imprimir los datos de la respuesta
            this.country = country;

            // Verifica el tipo de 'size' antes de la conversión
            console.log('Tipo de size antes de la conversión:', typeof this.country.size); // Mostrar tipo

            // Intentar convertir 'size' con el operador '+'
            const sizeConverted = +this.country.size;

            // Verificar si la conversión fue exitosa
            if (isNaN(sizeConverted)) {
              console.error('Error: el valor de size no es un número válido:', this.country.size);
            } else {
              console.log('Size después de la conversión:', sizeConverted); // Mostrar valor convertido
            }

            // Asegúrate de que 'size' sea un número antes de hacer patchValue
            this.form.patchValue({
              ...this.country,
              size: sizeConverted,  // Usar el valor convertido
            });

            // Marcar los controles como tocados para actualizar la vista
            this.form.get('size')?.markAsTouched();

            // Verificar el valor de 'size' después de patchValue
            console.log('Size después de patchValue:', this.form.get('size')?.value);  // Mostrar valor asignado
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se encontró el país',
              icon: 'error',
            });
            this.router.navigate(['/countries']);
          },
        });
      }
    });
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos correctamente.',
        icon: 'error',
      });
      return;
    }

    if (this.id && this.id > 0) {
      // Editar país
      this.editarPais();
    } else {
      // Crear país
      this.agregarPais();
    }
  }


  agregarPais() {
    const countryData = { ...this.form.value };
    delete countryData.id; // Asegúrate de no enviar un id en la creación

    // Verificar el valor de 'size' antes de enviar
    countryData.size = Number(countryData.size);

    console.log('Datos que se enviarán:', countryData); // Verificar los datos que se enviarán al servidor

    this.httpServices.createCountry(countryData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'El país se ha creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/countries']);
        });
      },
      error: (err) => {
        console.error('Error al crear el país:', err); // Mostrar error en consola
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear el país.',
          icon: 'error',
        });
      },
    });
  }



  editarPais() {
    this.httpServices.updateCountry(this.id, this.form.value).subscribe({

      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'El país se ha actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.form.reset();
          this.router.navigate(['/countries/', this.id]);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el país.',
          icon: 'error',
        });
      }
    });
  }
}
