import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSearchWeather } from '../models/get-search-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  constructor( private http: HttpClient) { }
  public searchFromPostalCode(postalcode: string): Observable<GetSearchWeather> {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postalcode},us&appid=5a4b2d457ecbef9eb2a71e480b947604`;
    return this.http.get<GetSearchWeather>(url);

  }
}
