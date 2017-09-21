import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Directive, Renderer, ElementRef, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { isBlank } from '@angular/common/src/facade/lang';

import { MakeProvider, noop } from '../helper';

let nextseq = 0;

@Component({
  selector: 'search-box',
  template: `<div>
  <input #input placeholder='{{label}}' [id]="id" [attr.name]="name" [(ngModel)]="value" (keydown)='onSearch($event, input.value)' (blur)='onBlur() '/>
  <button (click)='onClear(input)'>Clear</button>
</div>`,
  host: { '(search)': 'onChange($event)', '(touched)': 'onTouched()' },
  providers: [MakeProvider(SearchBox)]
})
export class SearchBox implements ControlValueAccessor {

  private _value: any = '';

  @Input() id: string;
  @Input() label: string;
  @Input() name: string = '';

  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this._onChangeCallback(val);
    }
  }
  get value(): any { return this._value; }

  @Output('search') searchEmitter = new EventEmitter<string>();
  @Output() touched = new EventEmitter();

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(
    private renderer: Renderer
    , private elementRef: ElementRef
  ) {
    this.id = `search-box-${nextseq++}`;
  }

  onSearch($event, value) {
    if ($event.keyCode == 13) {
      console.log('emitting search ' + value);
      this.searchEmitter.emit(value);
      $event.preventDefault();
    }
  }

  onBlur() {
    this.touched.emit(null);
  }

  onClear(input) {
    input.value = '';
    this.searchEmitter.emit('');
  }

  onChange($event) {
    this._onChangeCallback($event);
  }

  onTouched() {
    this._onTouchedCallback();
  }

  writeValue(val: any): void {
    this._value = val;
    this._onChangeCallback(val);
    // var normalizedValue = isBlank(value) ? '' : value;
    // this._renderer.setElementProperty(this._elementRef.nativeElement, 'search', normalizedValue);
  }

  registerOnChange(fn: (_: any) => void): void { this._onChangeCallback = fn; }
  registerOnTouched(fn: () => void): void { this._onTouchedCallback = fn; }
}
