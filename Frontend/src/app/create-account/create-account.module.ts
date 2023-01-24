import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account.component';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CreateAccountComponent],
})
export class CreateAccountModule { }
