import { environment } from './../../../environments/environment';
import { Dieta } from './../../models/dieta-zapis';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private httpOptions = {
    headers: new HttpHeaders({
      Autorization: 'Basic ' + btoa(`diety_szpital:password`),
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  saveDiety(dieta: Dieta): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/diety/save`, dieta,
      { headers: this.httpOptions.headers });
  }

  loadDiety(id: number): Observable<Dieta> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<Dieta>(`${environment.baseApiUrl}/diety/load`,
      { headers: this.httpOptions.headers, params: params });
  }

  loadAllDiety(): Observable<Dieta[]> {
    return this.http.get<Dieta[]>(`${environment.baseApiUrl}/diety/load-all`,
      { headers: this.httpOptions.headers });
  }

  deleteDiet(id: number): Observable<void> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<void>(`${environment.baseApiUrl}/diety/delete-by-id`,
      { headers: this.httpOptions.headers, params: params });
  }

}
