import { Injectable } from '@angular/core';
import { Response, ResponseOptions, URLSearchParams, RequestMethod } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

@Injectable()
export class DataMockService {
  constructor(
    private mockBackend: MockBackend
  ) {
    this.init();
  }

  init(): void {
    this.mockBackend.connections.subscribe((c: MockConnection) => {
      if (/\/api\/users/.test(c.request.url) === true && c.request.method === RequestMethod.Get) {
        const userdata = {
          id: 120, username: 'prakash', password: '', firstName: 'Prakash', lastName: 'Vivek'
        };
        const res = new ResponseOptions({
          status: 200, statusText: 'Ok', body: JSON.stringify([userdata])
        });
        const idregx: RegExp = /\/api\/users\/([0-9]+)/i
          , matchs = idregx.exec(c.request.url);
        let userid: any = 0;

        if (matchs && matchs.length > 0) {
          userid = matchs[1];
          userdata.id = userid;
          res.body = JSON.stringify(userdata);
        }
        c.mockRespond(new Response(res));
      }
    });
  }
}
