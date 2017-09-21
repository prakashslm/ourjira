import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';
// import { TodoAppModule } from './todo/todo-app.module';

import { AppComponent } from './app.component';
import { App1Component } from './app1.component';
import { LayoutModule } from '@layout/layout.module';
import { routing, routedComponents } from './app.routing';

import { AuthenticationService, UserService } from './services/index';

@NgModule({
  declarations: [
    AppComponent
    // , App1Component
    , routedComponents
  ],
  imports: [
    BrowserModule
    , FormsModule
    // , HttpModule
    , BrowserAnimationsModule
    , CoreModule
    , SharedModule.forRoot()
    , LayoutModule
    // , TodoAppModule
    , routing
  ],
  providers: [
    AuthenticationService
    , UserService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
  // bootstrap: [App1Component]
})
export class AppModule { }
