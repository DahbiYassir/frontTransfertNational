import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClientService } from '../../services/client.service';
import { Client } from '../../client';
import { TransfertMultipleService } from '../../services/transfert-multiple.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-transfert-multiple',
  templateUrl: './transfert-multiple.component.html',
  styleUrls: ['./transfert-multiple.component.scss']
})

export class TransfertMultipleComponent implements OnInit {

  constructor(public loader: LoadingService,private clientService : ClientService,private transfertMService:TransfertMultipleService,private fb : FormBuilder) { }
  loading$ = this.loader.loading$;

  ngOnInit(): void {
    this.getAllClients();
    this.initForm();
  }
  compteClient:String[]=[];
  selected:Boolean = true;
  formGroup ?: FormGroup
  formGroupT ?: FormGroup
 
  public clients : any[]=[];  
  public clients2 : any[]=[];  
  public benefs : Client[]=[]; 
  public deletecin ?:any;
  public benefsCin : String[]=[];
  
  public getAllClients() : void {
    this.clientService.getClients().subscribe(
      (response : any) =>{
        this.benefs = response;
        // this.benefs.forEach((element)=>{
        //    this.benefsCin.push(element.cin);
        // })
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
  openDeleteBenef(clientD:string){

this.clientService.getClientbyCin(clientD).subscribe(
  response=>{
    console.log('clientByCin',response);
    this.benefs.unshift(response);
    this.clients2 = this.clients2.filter(function( obj ) {
      return obj.client.cin !== clientD;
  });
  console.log('before',this.clients);
  this.clients = this.clients.filter(function( obj ) {
    return obj.client !== clientD;
});  
document.getElementById('closeButton2')?.click();
  },
  (error:HttpErrorResponse)=>{
    console.log('clientByCin ERROR',error);
  }
)
console.log('hada benf apres',this.benefs);
}
test:any={client:null,montant:0};
isNotNull:Boolean=false;
  public onAddBenef(addForm : NgForm) : void{
    if(addForm.value.montant<0 || addForm.value.montant>2000){
      this.isNotNull = true;
    }else{
    console.log("onAddClient Method");
    console.log(addForm.value);
    this.clients.push(addForm.value);
    this.clientService.getClientbyCin(addForm.value.client).subscribe(
      response=>{
        console.log('clientByCin',response);
          this.test.client = response;
          this.test.montant = addForm.value.montant;
          this.clients2.push(this.test);
        document.getElementById('closeButton')?.click();
        this.benefs = this.benefs.filter(function( obj ) {
          return obj.cin !== addForm.value.client;
      });
      console.log('benef apres',this.benefs);
      this.test={client:null,montant:0};
        addForm.resetForm();
      },
      (error:HttpErrorResponse)=>{
        console.log('clientByCin ERROR',error);
      }
    )
   }
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
 console.log('hada form t transfer',addFormT.value);
 console.log('hada tab t transfer',this.clients);
 this.transfertBackend.clientSender = addFormT.value.benef;
 this.clients.forEach(element=>{
  this.transfertBackend.clientsBenef.push(element.client);
  this.transfertBackend.mapCinMontant.set(element.client, element.montant);
 })
 this.transfertBackend.refAgent = 'ref5457';
 const convMap = {};
 this.transfertBackend.mapCinMontant.forEach((val: string, key: string) => {
  this.transfertBackend.mapCinMontant[key] = val;
});
 console.log('hada hwa transfert back',this.transfertBackend);
 
 this.transfertMService.transfertMultiple(this.transfertBackend).subscribe(
  (response : any) =>{
    console.log(response);
    Swal.fire({
      icon: 'success',
      title: 'Transfert multiple réussi',
    })
    this.clients = [];
    this.clients2 = [];
    this.transfertBackend={
      clientSender:String,
      clientsBenef: [],
      mapCinMontant: new Map<String,Number>(),
      refAgent:String
    };
    addFormT.resetForm();
  },
  (error : HttpErrorResponse) =>{
    console.log(error);
  }
)

  }

  public getClientByCin(cin:string) : any{
     this.clientService.getClientbyCin(cin).subscribe(
      response=>{
        console.log('clientByCin',response);
      },
      (error:HttpErrorResponse)=>{
        console.log('clientByCin ERROR',error);
      }
    )
  }

 changeT(event:NgForm){
   console.log('anaa changiit');
  }



}


