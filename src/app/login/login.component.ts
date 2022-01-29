import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
      this.agentService.loginAgent(ref).subscribe(
        (response : any) =>{
            if(response != null && response.ref_agent != null){
              console.log(response);
              this.router.navigate(['/dashboard']);
            }
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );

    }
}