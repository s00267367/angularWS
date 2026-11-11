import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service } from '@angular/core';
import { inject } from '@angular/core'; 
import { catchError, Observable, throwError } from 'rxjs';
import { Car, CreateCarDto } from '../models/car.model';
@Service()
export class CarService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:1610/api/v1/cars'; // this should be read from an env variable we will leave it for now.

    getCars(): Observable<Car[]> {
        return this.http
            .get<Car[]>(this.apiUrl)
    }

    getCarById(id: string): Observable<Car> {
        return this.http.get<Car>(`${this.apiUrl}/${id}`)
        }

    addCar(car: CreateCarDto): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car)
  }
  

  
    

}
