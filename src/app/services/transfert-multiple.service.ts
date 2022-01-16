import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfertMultipleService {
  private apiUrl =environment.apiTransfertUrl
  constructor(private http : HttpClient) {}

  public transfertMultiple(t : any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transfert/transfertV2M`,t);
  }
}
