import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
    , FormsModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    DatePipe
    , AuthGuard
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class CoreModule {
}
