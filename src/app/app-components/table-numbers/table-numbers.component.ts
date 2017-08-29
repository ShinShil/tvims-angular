import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-numbers',
  templateUrl: './table-numbers.component.html',
  styleUrls: ['./table-numbers.component.scss']
})
export class TableNumbersComponent {

  @Input() tableNumbers: Array<Row> = undefined;

}
