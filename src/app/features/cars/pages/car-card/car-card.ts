import { Component, input } from '@angular/core';
import { Car } from '../../models/car.model';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-car-card',
  styleUrl: './car-card.scss',
  templateUrl: './car-card.html',
})
export class CarCard {
  car = input.required<Car>();
}
