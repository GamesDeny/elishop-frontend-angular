import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TabViewModule} from 'primeng/tabview';
import {DataViewModule} from 'primeng/dataview';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    TabViewModule,
    DataViewModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    PasswordModule
  ]
})
export class PrimengModule { }
