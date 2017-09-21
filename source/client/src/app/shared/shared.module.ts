import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertService, PubSubService } from './services';
import { LoaderComponent, AlertComponent, PageNotFoundComponent, ErrorComponent, SearchBox } from './components/index';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SampleDirective } from './directives';

@NgModule({
  declarations: [
    PageNotFoundComponent
    , ErrorComponent
    , LoaderComponent
    , AlertComponent
    , SpinnerComponent
    , SearchBox
    , SampleDirective
  ],
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    // , HttpClientModule
  ],
  exports: [
    CommonModule
    // , FormsModule
    // , HttpClientModule

    , PageNotFoundComponent
    , ErrorComponent
    , LoaderComponent
    , AlertComponent
    , SpinnerComponent
    , SearchBox
    , SampleDirective
  ],
  providers: [
    DatePipe
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
      , providers: [
        AlertService
        , PubSubService
      ]
    }
  }
}
