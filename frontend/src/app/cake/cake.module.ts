import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeListComponent } from './cake-list/cake-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CakeFormPopupComponent } from './cake-form-popup/cake-form-popup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CakeListComponent, CakeFormPopupComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [CakeListComponent],
  entryComponents: [CakeFormPopupComponent]
})
export class CakeModule { }
