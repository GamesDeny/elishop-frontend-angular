import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import {ToolbarModule} from 'primeng/toolbar'

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
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
    TableModule,
    RadioButtonModule,
    ToastModule,
    TooltipModule,
    InputTextareaModule,
    DropdownModule,
    TagModule,
    ToolbarModule
  ],
})
export class PrimengModule {}
