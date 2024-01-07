import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherLocationService } from '../../service/weather-location.service';
import { Observable } from 'rxjs';
import { GetSearchWeather } from '../../models/get-search-weather';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [AsyncPipe,NgFor,JsonPipe],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements AfterViewInit {
  public weathers$: Observable<GetSearchWeather> = null;
  public constructor(private weatherLocationService: WeatherLocationService,private cdRef: ChangeDetectorRef
    ) {}
  ngAfterViewInit(): void {
    this.weathers$ = this.weatherLocationService.searchFromPostalCode('94040');
    this.cdRef.detectChanges();

  }
}
