export interface TransfertNational {
    codeT : number;
    reference : String;
    pin : String;
    motifExtourne : String;
    montant : number;
    dateCreation : Date;
    dateExperation : Date;
    statut : StatusTransfert;
    refAgent : String;
    clientDonneur : String;
    clientBeneficiaire : String;
}

export enum StatusTransfert {
    ASERVIR = "ASERVIR",
    PAYE ="PAYE",
    EXTOURNE ="EXTOURNE",
    RESTITUE="RESTITUE",
    BLOQUE ="BLOQUE"
  }

export enum TypeTransfert {
    POINTVENTE,GAB
}