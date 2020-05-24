import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
// import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditComponent }
  // TODO: add {path: 'preview/:id', component: PreviewComponent }
  // after preview component is implemented
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }