import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PrimengModule } from './primeng/primeng.module';
import {HttpClientModule} from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    TabsComponent,
    ProductsTableComponent,
    LoadingSpinnerComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
