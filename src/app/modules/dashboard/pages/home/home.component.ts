import { Component } from '@angular/core';
import { LocationComponent } from '../../components/location/location.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LocationComponent,
    NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public newpostalcode: string = '94040';
  actualizarPostalCode(newPostalCodeBusqueda: string) {
    console.log(newPostalCodeBusqueda);
    this.newpostalcode = newPostalCodeBusqueda;
  }

}
