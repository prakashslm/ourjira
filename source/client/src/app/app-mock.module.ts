import { NgModule } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { App1Component } from './app1.component';
// import { DataMockService } from './mocks/data-mock.service';
import { fakeBackendProvider } from './helpers/index';

// export function httpMockFactory(backend: MockBackend, defaultOptions: BaseRequestOptions): any {
//   return () => {
//     const mockhttp = new DataMockService(backend);

//     return mockhttp;
//   };
// }

@NgModule({
  imports: [
    AppModule
  ],
  providers: [
    BaseRequestOptions
    , MockBackend
    , fakeBackendProvider
  ],
  // bootstrap: [AppComponent]
  bootstrap: [App1Component]
})
export class AppMockModule { }
