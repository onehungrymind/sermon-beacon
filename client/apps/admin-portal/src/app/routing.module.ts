import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallbackComponent } from '@sb/ui-libraries';
import { SermonsComponent } from '@sb/sermons';
import { SermonViewComponent } from './sermon-view/sermon-view.component';

const routes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path: 'sermons', component: SermonsComponent},
  {path: 'sermon/:id', component: SermonViewComponent},
  {path: '**', redirectTo: 'sermons', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
