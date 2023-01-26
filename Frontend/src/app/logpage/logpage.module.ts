import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LogpageComponent } from './logpage.component';

@NgModule({
  declarations: [LogpageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LogpageComponent],
})
export class LogpageModule { }
