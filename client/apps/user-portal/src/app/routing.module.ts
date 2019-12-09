import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonsComponent } from '@sb/sermons';
import { SermonViewComponent } from './sermon-view/sermon-view.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: SermonsComponent },
      { path: ':id', component: SermonViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
