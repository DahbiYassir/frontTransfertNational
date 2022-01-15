import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClientService } from '../../services/client.service';
import { Client } from '../../client';

@Component({
  selector: 'app-transfert-multiple',
  templateUrl: './transfert-multiple.component.html',
  styleUrls: ['./transfert-multiple.component.scss']
})

export class TransfertMultipleComponent implements OnInit {

  constructor(private clientService : ClientService,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.getAllClients();
    this.initForm();
  }
  compteClient:String[]=[];
  selected:Boolean = true;
  formGroup ?: FormGroup
  formGroupT ?: FormGroup
 
  public clients : any[]=[];  
  public benefs : Client[]=[]; 
  public deletecin ?:any;

  
  public getAllClients() : void {
    this.clientService.getClients().subscribe(
      (response : any) =>{
        this.benefs = response;
        console.log('all clients',this.benefs)
      },
      (error : HttpErrorResponse) =>{
        console.log(error.message);
      }
    )
  }
  
  public openDeleteModal(id : String){
    this.deletecin = id;
    console.log('deleteId : ' +this.deletecin);
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button' ;
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','#deleteModal');
    container?.appendChild(button);
    button.click();
  }
  openDeleteBenef(clientD:String){
    this.clients = this.clients.filter(function( obj ) {
      return obj.client.cin !== clientD;
  });  
  document.getElementById('closeButton2')?.click();
}

  public onAddBenef(addForm : NgForm) : void{
    document.getElementById('closeButton')?.click();
    console.log("onAddClient Method");
    console.log(addForm.value);
    this.clients.push(addForm.value);
    console.log('benef avant',this.benefs);
    this.benefs = this.benefs.filter(function( obj ) {
      return obj.cin !== addForm.value.client.cin;
  });
  console.log('benef apres',this.benefs);

  }
  initForm(){
    this.formGroup = this.fb.group({
      'client' : [''],
      'montant' : ['']
    })
    this.formGroupT = this.fb.group({
      'benef' : [''],
      'montantT' : [''],
      'totalbenef' : ['']
    })
  }
  isTotal : Boolean = false;
  isMontant : Boolean = false;
  transfertBackend:any={
    clientSender:String,
    clientsBenef: [],
    mapCinMontant: new Map<String,Number>(),
    refAgent:String
  };
  transfer(addFormT:NgForm){
    console.log('transfer form')
    console.log(addFormT.value);
    console.log('tableau')
    console.log(this.clients);
   if(addFormT.value.totalbenef!= this.clients.length){
      this.isTotal = true;
   }
   else{
     this.isTotal = false;
   }
let totalAmount = 0;
this.clients.forEach(element=>{
    totalAmount += element.montant;
});
   if(addFormT.value.montantT!= totalAmount){
    this.isMontant = true;
 }
 else{
   this.isMontant = false;
 }

 this.transfertBackend.clientSender = addFormT.value.benef.cin;
 this.clients.forEach(element=>{
  this.transfertBackend.clientsBenef.push(element.client.cin);
  this.transfertBackend.mapCinMontant.set(element.client.cin, element.montant);
 })
 console.log('hada hwa transfert back',this.transfertBackend);
  }

 changeT(event:NgForm){
   console.log('anaa changiit');
  }



}


