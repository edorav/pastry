import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeModule } from './../cake/cake.module';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    CakeModule
  ]
})
export class HomepageModule { }
