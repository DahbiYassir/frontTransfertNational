import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TransfertNational, StatusTransfert } from '../../transfert-national';
import { TransfertNationalService } from '../../services/transfert-national.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { ClientService } from '../../services/client.service';
import { Client } from '../../client';
import { TransfertDto } from '../../transfert-dto';



@Component({
  selector: 'app-transfert-national',
  templateUrl: './transfert-national.component.html',
  styleUrls: ['./transfert-national.component.scss']
})
export class TransfertNationalComponent implements OnInit {
  title ='autocomplete';
  options : String[] = [];
  filtredOptions :String[] = [];
  filtredOptions2 :String[] = [];
  formGroup ?: FormGroup
  searchText : String="";
   t : TransfertDto = {
    clientSender : "",
    clientReceiver : "",
    montant : 0,
    refAgent  : ""
   } ;

  transferts : TransfertNational[] = [];
  p : number = 1;
  
  
  constructor(private clientService : ClientService,private transfertService : TransfertNationalService, private fb : FormBuilder) {  }

  ngOnInit(): void {
    this.initForm();
    this.getTransferts();
    this.getClients();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'client' : [''],
      'beneficiare' : [''],
      'montant' : ['']
    })
    this.formGroup.get('client')?.valueChanges.subscribe(response => {
      this.filterData(response);
    } )
    this.formGroup.get('beneficiare')?.valueChanges.subscribe(response => {
      this.filterData(response);
    } )
  }
  filterData(entredData : any){
    this.filtredOptions = this.options.filter(item=>{
      return item.toLowerCase().indexOf(entredData.toLowerCase()) > -1
    })
    this.filtredOptions2 = this.options.filter(item=>{
      return item.toLowerCase().indexOf(entredData.toLowerCase()) > -1
    })
  }
  
  getTransferts(){
    this.transfertService.getTransferts().subscribe(
      (response : any) =>{
        this.transferts = response;
        console.log('transferts',response);

      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
  getClients(){
    console.log('getClients()')
    this.clientService.getClients().subscribe(
      (response : any) =>{
        console.log('clients names :')
        console.log(response)
        response.forEach((element: any) => {
          console.log('element')
          console.log(element.cin);
          this.options.push(element.cin)
          this.filtredOptions.push(element.cin)
          this.filtredOptions2.push(element.cin)
        });
        console.log(this.options);
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onAddTransfert(addForm2 : NgForm) : void{
    document.getElementById('closeButton')?.click();
    console.log("onAddtransfert Method");
    console.log(addForm2.value);
    console.log(addForm2.value.client);
    this.t.clientReceiver = addForm2.value.beneficiare;
    this.t.clientSender = addForm2.value.client;
    this.t.montant = addForm2.value.montant;
    this.t.refAgent = "ref5457";
    console.log(this.t);
      this.transfertService.addTransfert(this.t).subscribe(
        (response : TransfertNational) =>{
          console.log('Ajout client réussi');
          this.getTransferts();
        },(error : HttpErrorResponse) =>{
          alert(error.message);
        }
      )
  }

}
