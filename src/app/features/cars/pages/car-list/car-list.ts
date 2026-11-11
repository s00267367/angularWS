import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarCard } from '../car-card/car-card';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  imports: [CarCard],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})
export class CarList{
  private carService = inject(CarService);
  
  cars = toSignal(this.carService.getCars())

}
