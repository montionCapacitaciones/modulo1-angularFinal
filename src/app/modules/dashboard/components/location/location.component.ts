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
  @Input() public postalCode: string = '94040';

  locations = signal<Location[]>([]);

  public weathers$: Observable<GetSearchWeather> = null;
  public constructor(private weatherLocationService: WeatherLocationService, private cdRef: ChangeDetectorRef
  ) { }
  ngAfterViewInit(): void {
    this.weathers$ = this.weatherLocationService.searchFromPostalCode(this.postalCode);
    this.cdRef.detectChanges();
    this.weathers$.subscribe(
      (weather) => {
        this.locations.set([
          ...this.locations(), {
            postalcode: this.postalCode,
            ciudad: weather.name,
            current_weather: weather.weather[0].main,
            description: weather.weather[0].description,
            temp: weather.main.temp
          }
        ]);
        console.log(this.locations())

      }
    )

  }
}
