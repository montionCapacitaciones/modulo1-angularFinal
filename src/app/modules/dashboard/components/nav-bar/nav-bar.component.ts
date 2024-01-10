import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormsModule, NgModel } from '@angular/forms';
import { WeatherLocationService } from '../../service/weather-location.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() public newPostalcodeSearch: EventEmitter<string> = new EventEmitter<string>();

  public busqueda: string = '';
  newLocationControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required]
  });

  public searchLocation(): void {
    this.newPostalcodeSearch.emit(this.busqueda)
    this.newLocationControl.setValue('');

  }

}
