import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TransfertNational } from '../../transfert-national';
import { TransfertNationalService } from '../../services/transfert-national.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { ClientService } from '../../services/client.service';
import { Client } from '../../client';
import { TransfertDto } from '../../transfert-dto';
import { TransfertExtourneDto } from '../../transfert-extourne-dto';
import Swal from 'sweetalert2';



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
  formGroupExtourne ?: FormGroup

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
    this.formGroupExtourne = this.fb.group({
      'motifExtourne' : ['']
      
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
          document.getElementById('closeButtonT')?.click();
          Swal.fire({
            icon: 'success',
            title: 'Ajout transfert réussi',
          })
          this.getTransferts();
        },(error : HttpErrorResponse) =>{
          alert(error.message);
        }
      )
  }
  transfertE?:TransfertNational;
  openExtourneModal(id:TransfertNational){
    this.transfertE = id;
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button' ;
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','#deleteModal');
    container?.appendChild(button);
    button.click();
  }

  transfertExtourneDTO:TransfertExtourneDto={
    refTransfert: "",
    refAgent: "",
    motifExtourne: ""
  };
  motifE:String="";
  formextourne(extForm:NgForm){
    console.log('formE value',extForm.value.motifExtourne);
    this.motifE = extForm.value.motifExtourne;
  }
  extournerTransfert(t:any,extForm:NgForm){
    if(t.status=='EXTOURNE'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Transfert deja extourné !',
      })
      document.getElementById('closeButtonE')?.click();

    }
    else{
    console.log(t);
    this.transfertExtourneDTO.refAgent="ref5457";
    this.transfertExtourneDTO.refTransfert=t.reference;
    this.transfertExtourneDTO.motifExtourne=extForm.value.motifExtourne;
    console.log('transfertExtourneSend',this.transfertExtourneDTO);
    this.transfertService.extourneTransfert(this.transfertExtourneDTO).subscribe(
      (response : any) =>{
        console.log('Transfert extourné');
        Swal.fire({
          icon: 'success',
          title: 'Transfert extourné',
        })
        document.getElementById('closeButtonE')?.click();
        this.getTransferts();
      },(error : HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }
}
}
