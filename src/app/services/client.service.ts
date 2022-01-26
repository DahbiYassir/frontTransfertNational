import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiClientCompteUrl;
  constructor(private http : HttpClient) { }

  public getClients() : Observable<Client>{
      return this.http.get<Client>(`${this.apiUrl}/clients`);
  }
  public addClient(client : Client) : Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients/saveClient`,client);
  }
  public updateClient(client : Client) : Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${client.idClient}`,client);
  }
  public deleteClient(clientId : number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }
  public getClientbyTel(tel : number) : Observable<Client>{
    return this.http.get<Client>((`${this.apiUrl}/clients/tel/${tel}`));
  }
  public getClientbyCin(cin : string) : Observable<Client>{
    return this.http.get<Client>((`${this.apiUrl}/clients/cin/${cin}`));
  }

}
