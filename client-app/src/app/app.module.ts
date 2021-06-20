import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

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
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CartRowComponent } from './cart-row/cart-row.component';
import { CartTableComponent } from './cart-table/cart-table.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AddPropostaComponent } from './add-proposta/add-proposta.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { OperationForbiddenComponent } from './operation-forbidden/operation-forbidden.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserFeedbacksComponent } from './user-feedbacks/user-feedbacks.component';
import { UserProposalsComponent } from './user-proposals/user-proposals.component';
import { AdminTabsComponent } from './admin-tabs/admin-tabs.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    TabsComponent,
    ProductsTableComponent,
    LoadingSpinnerComponent,
    ProductCardComponent,
    LoginComponent,
    RegisterComponent,
    CartRowComponent,
    CartTableComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    OrderSuccessComponent,
    AddPropostaComponent,
    AddFeedbackComponent,
    OperationForbiddenComponent,
    UserDetailsComponent,
    UserOrdersComponent,
    UserFeedbacksComponent,
    UserProposalsComponent,
    AdminTabsComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
