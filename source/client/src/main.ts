import { enableProdMode, NgModuleRef, VERSION } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppMockModule } from './app/app-mock.module';
import { environment } from './environments/environment';

import './vendor';

if (environment.production === true) {
  enableProdMode();
}

if (environment.dev === true || environment.mock === true) {
}

const init = (): void => {
  setTimeout(function () {
    let promise = platformBrowserDynamic().bootstrapModule(AppModule);

    if (environment.mock === true) {
      promise = platformBrowserDynamic()['bootstrapModule'](AppMockModule);
    }
    promise.then((module: NgModuleRef<any>) => {
      console.log(`ng v${VERSION.full}`);
    }).catch((e) => {
      console.error(e);
    });
  }, 1);
};

init();
