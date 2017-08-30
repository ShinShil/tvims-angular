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

  constructor(private tvimsService: TvimsService) { }

  ngOnInit(): void {
    this.graphs = this.tvimsService.Graphs;
    this.tvimsService.newNumbersSet.subscribe(numbers => {
      this.graphs = this.tvimsService.Graphs;
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

    // chart plot area
    this.chart = this.svg.append('g')
      .attr('class', 'paths')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = [this.graphs.empericFunc[0].x, this.graphs.empericFunc[this.graphs.empericFunc.length - 1].x];
    const yDomain = [0, 1.2];

    // create scales
    this.xScale = d3.scaleLinear().domain(xDomain).range([0, this.width]);
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

    this.chart.append('path')
      .attr('class', 'line')
      .attr('d', this.graphs.empericFunc);
  }

  updateChart(): void {
    this.chart.selectAll('dot')
      .data(this.graphs.empericFunc)
      .enter().append('circle')
      .attr('r', 3.5)
      .attr('cx', d => d.X)
      .attr('cy', d => d.y);
    // update scales & axis
    this.xScale.domain([this.graphs.empericFunc[0].x, this.graphs.empericFunc[this.graphs.empericFunc.length - 1].x]);
    this.yScale.domain([0, d3.max(this.graphs.empericFunc, point => point.y)]);
    this.colors.domain([0, this.graphs.empericFunc.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));
    // Add the scatterplot
  }
}
