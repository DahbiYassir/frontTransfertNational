import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransfertNational } from '../transfert-national';
import { environment } from 'src/environments/environment';
import { TransfertDto } from '../transfert-dto';

@Injectable({
  providedIn: 'root'
})
export class TransfertNationalService {
  private apiUrl =environment.apiTransfertUrl
  constructor(private http : HttpClient) {}

  public getTransferts() : Observable<TransfertNational>{
    return this.http.get<TransfertNational>(`${this.apiUrl}/transfert/transfertN`);
  }
  public getTranfertById(id : number) : Observable<TransfertNational>{
    return this.http.get<TransfertNational>(`${this.apiUrl}/clients/tel/${id}`)
  }
  public addTransfert(transfert : TransfertDto) : Observable<TransfertNational>{
    return this.http.post<TransfertNational>(`${this.apiUrl}/transfert/transfertV2`,transfert)
  }
}
