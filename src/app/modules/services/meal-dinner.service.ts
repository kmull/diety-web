import { Dieta } from './../../models/dieta-zapis';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Model } from '../../models/model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealDinnerService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDinner(mealType: string, type: string): Observable<Model[]> {
    mealType = mealType === 'drugieSniadanie' ? 'drugie-sniadanie' : mealType;
    return this.http.get<Model[]>(`${environment.baseApiUrl}/diety/${mealType}/danie/${type}`,
      { headers: this.httpOptions.headers });
  }

  saveMeal(mealType: string, type: string, meal: Model): Observable<Model[]> {
    mealType = mealType === 'drugieSniadanie' ? 'drugie-sniadanie' : mealType;
    return this.http.post<Model[]>(`${environment.baseApiUrl}/diety/${mealType}/add/${type}`, meal,
      { headers: this.httpOptions.headers });
  }

  removeMeal(mealType: string, meal: Model): Observable<Model[]> {
    mealType = mealType === 'drugieSniadanie' ? 'drugie-sniadanie' : mealType;
    return this.http.post<Model[]>(`${environment.baseApiUrl}/diety/${mealType}/remove-meal`, meal,
      { headers: this.httpOptions.headers });
  }

}
