import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import { Car } from '../../models/car.model';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})
export class CarList implements OnInit{
  private carService = inject(CarService);
  
  cars$!: Observable<Car[]>;

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }

}
