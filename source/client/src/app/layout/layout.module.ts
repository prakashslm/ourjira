import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';

import { Layout1Component } from './layout1/side-layout.component';
import { PartialComponent } from './partial/partial.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    Layout1Component
    , PartialComponent
    , SidebarComponent
  ],
  imports: [
    CommonModule
    , RouterModule
    , SharedModule
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    Layout1Component
    , PartialComponent
    , SidebarComponent
  ],
  entryComponents: []
})
export class LayoutModule { }
