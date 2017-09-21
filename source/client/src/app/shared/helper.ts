import { forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const noop = () => { };

export function MakeProvider(type: any): Provider {
  return <Provider>{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => type), multi: true
  }
}

export function merge(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

  return obj3;
}
