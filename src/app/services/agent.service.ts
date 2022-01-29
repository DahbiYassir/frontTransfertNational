import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../agent';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = 'https://agent-service-app.herokuapp.com'
  constructor(private http : HttpClient) { }

  public loginAgent(ref : any) : Observable<Agent>{
    return this.http.get<Agent>(`${this.apiUrl}/agent/ref/${ref}`);
  }
}