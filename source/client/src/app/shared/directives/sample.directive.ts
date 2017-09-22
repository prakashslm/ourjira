import {
  Attribute, Directive, ElementRef, HostBinding
  , Input, Output, Renderer2, SimpleChange
} from '@angular/core';

import * as d3 from 'd3';

@Directive({
  selector: '[sample]'
})
export class SampleDirective {
  private domNode: HTMLElement = null;

  @Input() data: Array<number>;
  @Input() type: string;

  constructor(
    private elementRef: ElementRef
    , private renderer2: Renderer2
    , @Attribute('width') private width: string
    , @Attribute('height') private height: string
  ) {
    this.type = 'div';
  }

  private __render(newValue: any): void {
    // const dom = new BrowserDomAdapter();
    // let myEle = dom.getElementsByClassName(this.elementRef.nativeElement, element)[0];

    this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', '');
    // d3.select('body').append('svg').attr('width', 50).attr('height', 50).append('circle').attr('cx', 25).attr('cy', 25).attr('r', 25).style('fill', 'purple');

    if (!newValue) { return; }
    const chart = d3.select(this.elementRef.nativeElement);

    if (this.type === 'div') {
      chart.append('div').attr('class', 'chart')
        .style('width', this.width)
        .style('height', this.height)
        .selectAll('div')
        .data(this.data).enter().append('div')
        .transition()
        .duration(2000)
        .ease(d3.easeElastic)
        // .delay((d, i) => { return i * 10; })
        .style('width', (d) => { return d + '%'; })
        .text((d) => { return d + '%'; });
    } else {
      const barHeight = 20
        , x = d3.scaleLinear().domain([0, d3.max(this.data)]).range([0, 100]);
      chart.attr('class', 'chart')
        .attr('width', this.width)
        .attr('height', this.data.length * barHeight);

      const bar = chart.selectAll('g').data(this.data).enter().append('g').attr('transform', (d, i) => {
        return 'translate(0, ' + i * barHeight + ')';
      });
      bar.append('rect').attr('width', (d) => {
        return x(d);
      }).attr('height', (d) => {
        return barHeight - 1;
      });
      bar.append('text').attr('x', (d) => {
        return x(d) - 3;
      }).attr('y', (d) => {
        return barHeight / 2;
      }).attr('dy', '0.34em').text((d) => {
        return d;
      });
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.__render(this.data);
  }
}

@Directive({ selector: '[highlight]' })
export class HighlightDirective {
  @Input() highlight: string;

  @HostBinding('style.font-size')
  @Input() fontSize: string;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.style.backgroundColor = (this.highlight || 'yellow').toUpperCase();
  }
}
