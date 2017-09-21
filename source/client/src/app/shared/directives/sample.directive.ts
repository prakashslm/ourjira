import { Attribute, Directive, ElementRef, Input, Output, SimpleChange } from '@angular/core';

@Directive({
  selector: '[sample]'
})

export class SampleDirective {
  @Input() data: Array<number>;

  constructor(
    elementRef: ElementRef
    , @Attribute('width') private width: string
    , @Attribute('height') private height: string
  ) {
  }

  private __render(newValue: any): void {
    console.log(newValue, this.width, this.height);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.__render(this.data);
  }
}
