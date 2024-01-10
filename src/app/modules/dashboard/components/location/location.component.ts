import { AfterViewInit, ChangeDetectorRef, Component, Input, signal } from '@angular/core';
import { WeatherLocationService } from '../../service/weather-location.service';
import { Observable } from 'rxjs';
import { GetSearchWeather } from '../../models/get-search-weather';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [AsyncPipe, NgFor, JsonPipe],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements AfterViewInit {

  @Input() public set postalCode(nuevoPostalCode: string) {
    this.cargandoWeatherLocation(nuevoPostalCode);
  }

  locations = signal<Location[]>([]);

  public weathers$: Observable<GetSearchWeather> = null;
  public constructor(private weatherLocationService: WeatherLocationService, private cdRef: ChangeDetectorRef
  ) { }
  ngAfterViewInit(): void {

  }
  cargandoWeatherLocation(newPostalCode:string): void{
    if(newPostalCode === '' || (newPostalCode === undefined) || newPostalCode === null ) {
      return ;
    }
    this.weathers$ = this.weatherLocationService.searchFromPostalCode(newPostalCode);
    this.cdRef.detectChanges();
    this.weathers$.subscribe(
      (weather) => {
        this.locations.set([
          {
            postalcode: newPostalCode,
            ciudad: weather.name,
            current_weather: weather.weather[0].main,
            description: weather.weather[0].description,
            temp: weather.main.temp
          },...this.locations(),
        ]);
        console.log(this.locations())

      }
    )

  }

  eliminarLocation(location: Location): void {
    const index = this.locations().indexOf(location);
    this.locations.set([...this.locations().slice(0, index), ...this.locations().slice(index + 1)]);
  }
  clearCompleted(): void {
    this.locations.set([]);
  }
}
