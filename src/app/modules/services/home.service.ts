import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "src/app/models/message";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  helloWorldService() {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('javaguides' + ':' + 'password') });
    return this.http.get<Message>(`${environment.baseApiUrl}/api/v1/greeting`,
      { headers: this.httpOptions.headers });
  }
}
