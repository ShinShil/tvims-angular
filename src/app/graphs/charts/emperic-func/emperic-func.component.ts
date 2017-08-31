import { element } from 'protractor/built';
import { TvimsService } from '../../../tvims.service';
import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-emperic-func',
  templateUrl: './emperic-func.component.html',
  styleUrls: ['./emperic-func.component.css']
})
export class EmpericFuncComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 40, right: 20 };
  private chart: any;
  private width = 0;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private graphs: Graphs;
  private svg;
  private links: Array<{ src: Point, dst: Point }> = [];

  constructor(private tvimsService: TvimsService) { }

  ngOnInit(): void {
    this.graphs = this.tvimsService.Graphs;
    this.links = this.graphs.empericFunc.map((el, i, arr) => {
      const res = {
        src: el,
        dst: arr[i + 1]
      };

      return res;
    });
    this.links.pop();
    this.tvimsService.newNumbersSet.subscribe(numbers => {
      this.graphs = this.tvimsService.Graphs;
      this.links = this.graphs.empericFunc.map((el, i, arr) => {
        const res = {
          src: el,
          dst: arr[i + 1]
        };

        return res;
      });
      this.links.pop();
      if (this.width === 0) {
        this.createChart();
      }
      this.updateChart();
    });
    if (this.graphs) {
      this.createChart();
      if (this.graphs.empericFunc) {
        this.updateChart();
      }
    }
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    this.chart = this.svg.append('g')
      .attr('class', 'paths')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = [this.graphs.empericFunc[0].x, this.graphs.empericFunc[this.graphs.empericFunc.length - 1].x];
    const yDomain = [0, 1.2];
    // create scales
    this.xScale = d3.scaleLinear().domain(xDomain).range([0, this.width - 50]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // x & y axis
    this.xAxis = this.svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = this.svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart(): void {

    this.xScale.domain([this.graphs.empericFunc[0].x, this.graphs.empericFunc[this.graphs.empericFunc.length - 1].x]);
    this.yScale.domain([0, 1.2]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('circle.nodes')
      .data(this.graphs.empericFunc);
    update.exit().remove();

    this.chart.selectAll('circle.nodes').transition()
      .attr('class', 'nodes')
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', d => 3)
      .attr('fill', 'black');

    update
      .enter()
      .append('svg:circle')
      .attr('class', 'nodes')
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', d => 3)
      .attr('fill', 'black');

    const updateLinks = this.chart.selectAll('line')
      .data(this.links);
    updateLinks.exit().remove();

    this.chart.selectAll('line').transition()
      .attr('x1', d => this.xScale(d.src.x))
      .attr('y1', d => this.yScale(d.src.y))
      .attr('x2', d => this.xScale(d.dst.x))
      .attr('y2', d => this.yScale(d.dst.y))
      .style('stroke', 'rgb(6,120,155)');

    updateLinks
      .enter()
      .append('line')
      .attr('x1', d => this.xScale(d.src.x))
      .attr('y1', d => this.yScale(d.src.y))
      .attr('x2', d => this.xScale(d.dst.x))
      .attr('y2', d => this.yScale(d.dst.y))
      .style('stroke', 'rgb(6,120,155)');
  }
}
