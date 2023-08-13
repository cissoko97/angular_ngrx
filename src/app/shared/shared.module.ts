import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guard/auth/auth.guard';
import { NoAuthGuard } from './guard/no-auth/no-auth.guard';
import { HasRoleDirective } from './directives/has-role/has-role.directive';

@NgModule({
  declarations: [
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HasRoleDirective,
  ],
  providers: [AuthGuard, NoAuthGuard]

})
export class SharedModule { }
