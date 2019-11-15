import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SermonsComponent, SermonListComponent } from '@app/sermons';

const routes: Routes = [
  { 
    path: '', component: SermonsComponent, children: [
      { path: ':id', component: SermonListComponent }
    ]
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    declarations: [],
})
export class AppRouterModule { }
