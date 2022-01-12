import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/http';
import { Observable } from 'rxjs';
import { TransfertNational } from 'app/transfert-national';

@Injectable({
  providedIn: 'root'
})
export class TransfertNationalService {
  private apiUrl =''
  constructor(private http : HttpClient) {}

  public getTransferts() : Observable<TransfertNational>{
    return this.http.get<TransfertNational>(`${this.apiUrl}/transfert/transfertN`);
  }
  public getTranfertById(id : number) : Observable<TransfertNational>{
    return this.http.get<TransfertNational>(`${this.apiUrl}/clients/tel/${id}`)
  }
  public addTransfert(transfert : TransfertNational) : Observable<TransfertNational>{
    return this.http.post<TransfertNational>(`${this.apiUrl}/transfert/transfertN`,transfert)
  }
}
