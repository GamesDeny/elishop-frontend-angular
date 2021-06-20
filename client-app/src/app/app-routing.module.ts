import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from 'src/models/path.enum';
import { AdminTabsComponent } from './admin-tabs/admin-tabs.component';
import { AdminGuard } from './admin.guard';
import { AuthenticationGuard } from './authentication.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { TabsComponent } from './tabs/tabs.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: Path.Login,
    component: LoginComponent
  },
  {
    path: Path.Register,
    component: RegisterComponent
  },
  {
    path: Path.Mainpage,
    component: MainpageComponent,
    children: [
      {
        path: Path.TabsPage,
        component: TabsComponent
      },
      {
        path: Path.Checkout,
        component: CheckoutComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: Path.OrderSuccess,
        component: OrderSuccessComponent,
      },
      {
        path: Path.ProductDetails + '/:id',
        component: ProductDetailsComponent
      },
      {
        path: Path.UserDetails + '/:id',
        component: UserDetailsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: Path.AdminTabs,
        component: AdminTabsComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
