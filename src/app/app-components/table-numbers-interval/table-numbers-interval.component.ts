import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-numbers-interval',
  templateUrl: './table-numbers-interval.component.html',
  styleUrls: ['./table-numbers-interval.component.scss']
})
export class TableNumbersIntervalComponent {
  @Input() tableNumbers: Array<RowInterval> = undefined;
}
