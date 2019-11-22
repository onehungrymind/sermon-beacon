import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonsComponent } from './sermons/sermons.component';
import { SermonViewComponent } from './sermons/sermon-view/sermon-view.component';

const routes: Routes = [
  {
    path: '', component: SermonsComponent, children: [
      { path: ':id', component: SermonViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
