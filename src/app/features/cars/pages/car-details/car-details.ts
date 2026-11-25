import { Component, inject, input, signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { RouterLink, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  imports: [RouterLink, MatButton],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {

  private snackBar = inject(MatSnackBar);
  private carService = inject(CarService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  readonly initial: LoadState<Car> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(car._id).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
        this.openErrorSnackBar(err.message);
      },
    });
  }

  private openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000,               // how long the snackbar stays visible (ms)
      panelClass: ['error-snackbar'] // define this class in styles.scss
    });
  }



}
  
