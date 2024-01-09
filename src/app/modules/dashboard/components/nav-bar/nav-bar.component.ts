import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  locations = signal<Location[]>([]);
  public busqueda: string = '';
  newLocationControl= new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required    ]
  });
  loadLocation(): void {
    console.log('esta es un prueba')
  }

}
