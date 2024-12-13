import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Verificar si el token está presente en localStorage
  const token = localStorage.getItem('token');

  // Si el token no está, redirigir al login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Si el token está, permitir el acceso
  return true;
};
