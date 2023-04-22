import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/auth/auth.guard';
import { ListBookComponent } from '../book/list-book/list-book.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  { path: 'add', component: AddUserComponent, canActivate: [AuthGuard], data: { updated: false } },
  { path: 'update', component: AddUserComponent, canActivate: [AuthGuard], data: { updated: true } },
  { path: 'list', component: ListUserComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
