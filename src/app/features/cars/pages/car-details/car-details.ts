import { Component, inject, input, signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {
  private carService = inject(CarService);

    readonly id = input.required<string>();

    readonly car = signal<Car | null>(null);

    ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe(carResponse => {
      this.car.set(carResponse);
    });

  }

}
