import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { HttpServicesService } from '../../http-services.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  showPassword: boolean = false;
  id = '';
  User: User | undefined;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    sex: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    country: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
  });

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private http: HttpServicesService,
    private activate: ActivatedRoute) {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llena todos los campos correctamente',
      });
      return;
    }
    if (this.form.value) {
      this.aagregarUsuario();
    }
  }


  aagregarUsuario() {
    this.http.creatUser(this.form.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario agregado',
          text: 'El usuario se ha agregado correctamente y se ha enviado un correo de bienvenida.',
        }).then(() => {
          this.form.reset({ id: '' });
          this.router.navigate(['/menu']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || 'Hubo un problema al registrar al usuario.',
        });
      },
    });
  }


  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
