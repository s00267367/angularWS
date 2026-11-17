import { Component, inject, input, signal, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCarDto } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import {notBlank} from '../../../../shared/validators/not-blank.validator';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forbiddenValue } from '../../../../shared/validators/forbiddenValue.validator';

@Component({
  imports: [
    RouterLink, 
    FormsModule, 
    ReactiveFormsModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm implements OnInit {
  saving = signal(false);
  saveError = signal<string | null>(null);
  readonly id = input<string>();  // note this is optional by default
  
  private snackBar = inject(MatSnackBar);
  private carService = inject(CarService);
  private router = inject(Router);

  readonly currentYear = new Date().getFullYear();

  private formBuilder = inject(FormBuilder);
  carForm = this.formBuilder.nonNullable.group({
    make: ['', [Validators.required, forbiddenValue('test'), notBlank, Validators.minLength(2), Validators.maxLength(30)]],
    model: ['', [Validators.required, forbiddenValue('test'), notBlank, Validators.maxLength(30)]],
    year: this.formBuilder.control<number | null>(null, [Validators.min(1950), Validators.max(this.currentYear + 1),])
  });


  onSubmit(): void {
    this.carForm.disable();
    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);

    const id = this.id();

    const request = id
      ? this.carService.updateCar(id, newCar)
      : this.carService.addCar(newCar);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newCar.make} ${newCar.model} saved`, 'Close', { duration: 10000 });
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.carForm.enable();
      },
    });
  }

  ngOnInit(): void {
    const id = this.id();
    if (!id) return; // adding a new car, nothing to load

    this.carService.getCarById(id).subscribe({
      next: (car) =>
        this.carForm.patchValue({ make: car.make, model: car.model, year: car.year ?? null }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

}



