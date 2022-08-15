import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';

const routes: Routes = [
  { path: 'add', component: AddBookComponent, data: { updated: false } },
  { path: 'update', component: AddBookComponent, data: { updated: true } },
  { path: 'list', component: ListBookComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
