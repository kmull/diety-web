import { environment } from './../../../environments/environment';
import { DietaZapis } from './../../models/dieta-zapis';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  saveDiety(dieta: DietaZapis): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/diety/save`, dieta,
      { headers: this.httpOptions.headers });
  }

  loadDiety(id: number): Observable<DietaZapis> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<DietaZapis>(`${environment.baseApiUrl}/diety/load`,
      { headers: this.httpOptions.headers, params: params });
  }

  loadAllDiety(): Observable<DietaZapis> {
    return this.http.get<DietaZapis>(`${environment.baseApiUrl}/diety/load-all`,
      { headers: this.httpOptions.headers });
  }

}
