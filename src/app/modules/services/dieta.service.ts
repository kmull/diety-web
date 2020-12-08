import { environment } from './../../../environments/environment';
import { DietaZapis } from './../../models/dieta-zapis';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(private http: HttpClient) { }

  saveDiety(dieta: DietaZapis): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + `/diety/save`, dieta);
  }

}
