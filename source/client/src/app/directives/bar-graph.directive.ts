import { Directive, ElementRef, Attribute, SimpleChange } from '@angular/core';
// import { D3Service, D3, Selection } from 'd3-ng2-service';
// <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Directive({
  selector: 'bar-graph'
})

export class BarGraphDirective {
  private data: Array<number>;  // raw chart data
  private divs: any;            // DIV collection

  /**
   * Construct a new BarGraph
   *
   * @param elementRef: ElementRef (Injected) Reference to the DOM element associated with this Directive (see selector)
   *
   * @param width: string Width attribute from the containing template
   *
   * @param height: string Height attribute from the containing template
   *
   * @return Nothing
   */
  constructor(elementRef: ElementRef
    // , d3Service: D3Service
    , @Attribute('width') width: string
    , @Attribute('height') height: string
  ) {
    const el: any = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
    // let d3: D3 = d3Service.getD3();          // <-- obtain the d3 object from the D3 Service
    // let graph: Selection<any, any, any, any> = d3.select(el);             // D3 chart container
    const d3: any = {}, graph: any = {};

    // setup the graph
    this.divs = graph
      .append('div')
      .attr({
        'class': 'chart'
      })
      .style({
        'width': width + 'px',
        'height': height + 'px',
      })
      .selectAll('div');
  }

  // Render the D3 Bar Chart
  private __render(newValue: any): void {
    if (!newValue)
      return;

    // join the data,then chain styles and bar text ... all the usual suspects
    this.divs.data(newValue).enter().append('div')
      .transition().ease('elastic')
      .style('width', (d: any) => d + '%')
      .text((d: any) => d + '%');
  }

  // update render on change
  private ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.__render(this.data);
  }
}
