import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SermonsComponent } from '@sb/sermons';

const routes: Routes = [
  {path: '', component: SermonsComponent, data: {isAdmin: true}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
