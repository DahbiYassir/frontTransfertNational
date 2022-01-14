import { Component, OnInit } from '@angular/core';
;
import { Client } from '../../client';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

 searchText : String=""; 
 p : number = 1 ;

public clients : Client[]=[];
public editClient ?: Client ;
public deleteId ?:any;

constructor(private clientService : ClientService) { }


  ngOnInit(): void {
    this.getAllClients();
  }
  public onDeleteClient(id : number){
    console.log('Id :' +id);
    this.clientService.deleteClient(id).subscribe(
        (response : any) =>{
          console.log('Client supprimmé !');
          this.getAllClients();
        },(error : HttpErrorResponse) =>{
          alert(error.message);
        }
      )
  }

  public openDeleteModal(id : number){
    this.deleteId = id
    console.log('deleteId : ' +this.deleteId);
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button' ;
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','#deleteModal');
    container?.appendChild(button);
    button.click();
  }

  public onUpdateClient(client : Client) : void{
    document.getElementById('closeButton2')?.click();
    console.log("onUpdateClient Method");
    console.log(client);
      this.clientService.updateClient(client).subscribe(
        (response : Client) =>{
          console.log('Client mise à jour !');
          this.getAllClients();
        },(error : HttpErrorResponse) =>{
          alert(error.message);
        }
      )
  }
  public openEditModal(client : Client){
    this.editClient = client;
    console.log(this.editClient);
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button' ;
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','#editModal');
    container?.appendChild(button);
    button.click();
  }

  public onAddClient(addForm : NgForm) : void{
    document.getElementById('closeButton')?.click();
    console.log("onAddClient Method");
    console.log(addForm.value);
      this.clientService.addClient(addForm.value).subscribe(
        (response : Client) =>{
          console.log('Ajout client réussi');
          this.getAllClients();
        },(error : HttpErrorResponse) =>{
          alert(error.message);
        }
      )
  }

  public getAllClients() : void {
    this.clientService.getClients().subscribe(
      (response : any) =>{
        this.clients = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  
}
