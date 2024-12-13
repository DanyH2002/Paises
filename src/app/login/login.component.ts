import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpServicesService } from '../http-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;

  constructor(private router: Router, public fb: FormBuilder, private servicio: HttpServicesService) { }

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Llama al servicio de login
    const { email, password } = this.form.value;
    this.servicio.loginUser(email, password).subscribe((data: any) => {
      if (data.status) {
        localStorage.setItem('token', data.token);
        console.log('Token guardado:', data.token);
        Swal.fire({
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
        });
        this.router.navigate(['/countries']);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  redirectToRegister() {
    // Redirige al componente de registro
    this.router.navigate(['/sigin']);
  }
}
