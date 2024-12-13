import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServicesService } from '../http-services.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  constructor(private router: Router, private httpService: HttpServicesService) { }

  ngOnInit(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout(): void {
    // Eliminar el token o los datos de sesión y redirigir al login
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
