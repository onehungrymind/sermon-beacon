import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SermonsComponent } from '@app/sermons';
import { ManageComponent } from './manage/manage.component';
import { SearchbarComponent } from '@app/searchbar';


const routes: Routes = [
  {
    path: '',
    component: SearchbarComponent,
    pathMatch: 'full'
  },
  {
    path: 'Sermons',
    component: SermonsComponent
  },
  {
    path: 'Manage',
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }