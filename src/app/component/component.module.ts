import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";
import { ClientComponent } from './client/client.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { TransfertNationalComponent } from './transfert-national/transfert-national.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule
    
  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    ClientComponent,
    SearchFilterPipe,
    TransfertNationalComponent
  ]
})
export class ComponentsModule { }
