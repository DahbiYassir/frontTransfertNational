import { Component, OnInit } from '@angular/core';
import {topcard} from './top-cards-data';
import { TransfertNationalService } from '../../../services/transfert-national.service';
import { TransfertNational } from '../../../transfert-national';
import { HttpErrorResponse } from '@angular/common/http/http';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[]=[];
  x : string ="test string "
  transferts : TransfertNational[] = [];
  todayTf : TransfertNational[] = [];
  nombreTf : number = 0 ;
  nombreString : string ="";

  constructor(private transfertService : TransfertNationalService) { 

  
  }

  ngOnInit(): void {
    this.getTransferts();
  }

  getTransferts(){
    this.transfertService.getTransferts().subscribe(
      (response : any) =>{
        this.transferts = response;
        this.todaysss();
        this.montant();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  todaysss(){
    this.transferts.forEach(e =>{
      var today  = new Date();
      let newDate = new Date(e.dateCreation);
      if(newDate.getDay() == today.getDay()){
        this.todayTf.push(e);
      }
    })
    console.log("today's trasnfert");
    console.log(this.todayTf);
    this.nombreTf = this.todayTf.length;
    this.nombreString = this.nombreTf.toString();
    console.log(this.nombreString)

    this.topcards=[{
      bgcolor: 'success',
      icon: 'bi bi-arrow-down-up',
      title: this.nombreTf,
      subtitle: 'Nombre de Transferts'
    },
    {
      bgcolor: 'info',
      icon: 'bi bi-layers',
      title: 80000,
      subtitle: 'Plafond MAD'
    }];
  }
  total : number = 0;
  montant(){
    this.transferts.forEach(e=>{
      this.total = this.total + e.montant;
    })
    console.log("total : " +this.total);
    this.topcards.push({
      bgcolor: 'danger',
      icon: 'bi bi-cash',
      title: this.total,
      subtitle: 'MAD'
    });
  }
}
