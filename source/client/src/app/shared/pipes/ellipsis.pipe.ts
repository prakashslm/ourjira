import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    value = String(value).trim();

    if (typeof (args) === 'undefined') {
      return value;
    }
    const limit = (args.length > 0) ? parseInt(args[0], 10) : 20;
    const trail = (args.length > 1) ? args[1] : '...'; // '&hellip;'

    return (value.length > limit) ? `${value.substring(0, limit)} ${trail}` : value;
  }
}
