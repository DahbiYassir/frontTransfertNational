import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup| any;
  constructor( private router: Router, @Inject(AgentService) private agentService : AgentService) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      username: new FormControl(),
      password: new FormControl()});
  }

  onSubmit(){

      
    var ref = this.loginForm.get('username').value; 
    var pass = this.loginForm.get('password').value;    
      this.agentService.loginAgent(ref).subscribe(
        (response : any) =>{
            if(response != null && response.refAgent != null && pass=="1234"){
              console.log(response);
              environment.logged = true;
              this.router.navigate(['/dashboard']);
            }
        },
        (error : HttpErrorResponse) =>{
          console.log(error.message);
        }
      );

    }
}
