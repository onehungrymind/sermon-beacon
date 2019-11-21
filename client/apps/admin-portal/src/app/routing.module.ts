import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SermonsComponent } from '@sb/sermons';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent
  },
  {
    path: 'sermons',
    component: SermonsComponent
  },
  {
    path: 'management',
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }