import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransfertNational, StatusTransfert } from '../../transfert-national';


@Component({
  selector: 'app-transfert-national',
  templateUrl: './transfert-national.component.html',
  styleUrls: ['./transfert-national.component.scss']
})
export class TransfertNationalComponent implements OnInit {
  title ='autocomplete';
  options =["hamid","simo","simhamed"];
  filtredOptions =["hamid","simo","simhamed"];
  formGroup ?: FormGroup
  searchText : String="";

  t : TransfertNational ={
    codeT : 231312,
    reference : "HFSRGQ123",
    pin : "P213D",
    motifExtourne : "motif",
    montant : 560,
    dateCreation : new Date(),
    dateExperation : new Date(),
    statut : StatusTransfert.PAYE,
    refAgent : "A7863",
    clientDonneur : "H23131",
    clientBeneficiaire : "E5141"
  }
  tt : TransfertNational ={
    codeT : 252312,
    reference : "HadzQ1653",
    pin : "P1098756D",
    motifExtourne : "motif 2",
    montant : 1000,
    dateCreation : new Date(),
    dateExperation : new Date(),
    statut : StatusTransfert.ASERVIR,
    refAgent : "A7863",
    clientDonneur : "F2412401",
    clientBeneficiaire : "L14531"
  }
  transferts : TransfertNational[] = [this.t, this.tt];
  p : number = 1;

  constructor(private fb : FormBuilder) {  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'client' : ['']
    })
    this.formGroup.get('client')?.valueChanges.subscribe(response => {
      this.filterData(response);
    } )
  }
  filterData(entredData : any){
    this.filtredOptions = this.options.filter(item=>{
      return item.toLowerCase().indexOf(entredData.toLowerCase()) > -1
    })
  }

}
