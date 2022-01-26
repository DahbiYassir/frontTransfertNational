import { Component, OnInit } from '@angular/core';
;
import { Client } from '../../client';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

//test
  ngOnInit(): void {
    this.getAllClients();
  }
  public onDeleteClient(id : number){
    console.log('Id :' +id);
    document.getElementById('closeButton3')?.click();
    this.clientService.deleteClient(id).subscribe(
        (response : any) =>{
          console.log('Client supprimmé !');
          this.getAllClients();
          Swal.fire({
            icon: 'success',
            title: 'Client supprimé !',
          })
        },(error : HttpErrorResponse) =>{
          Swal.fire({
            icon: 'error',
            title: 'Ops ! quelque chose s\'est mal passé',
          })

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
          Swal.fire({
            icon: 'success',
            title: 'Client mise à jour !',
          })
        },(error : HttpErrorResponse) =>{
          alert(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Ops ! Quelque chose s\'est mal passé',
          })
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
          Swal.fire({
            icon: 'success',
            title: 'Ajout client réussi',
          })
        },(error : HttpErrorResponse) =>{
          alert(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Ops ! Quelque chose s\'est mal passé',
          })
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
