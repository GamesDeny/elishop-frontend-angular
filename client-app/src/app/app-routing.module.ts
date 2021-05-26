import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from 'src/models/path.enum';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: Path.Mainpage,
    component: MainpageComponent,
    children: [
      {
        path: Path.TabsPage,
        component: TabsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
