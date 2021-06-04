import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TabViewModule} from 'primeng/tabview';
import {DataViewModule} from 'primeng/dataview';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';

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
    PasswordModule,
    CalendarModule,
    InputNumberModule,
    OverlayPanelModule,
    MenuModule,
    DialogModule,
    TableModule
  ]
})
export class PrimengModule { }
