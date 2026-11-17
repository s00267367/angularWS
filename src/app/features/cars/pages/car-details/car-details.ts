import { Component, inject, input, signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
@Component({
  imports: [RouterLink, MatButton],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {

  private carService = inject(CarService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Car> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

}
  
