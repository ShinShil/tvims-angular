import { TvimsService } from './tvims.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // inputNumbers = `120, 135, 116, 118, 133, 136, 125, 126, 119, 126, 129, 127, 129, 124, 127, 132, 126, 131, 127,
  // 130, 126, 124, 135, 127, 124, 123, 123, 130, 132, 143, 122, 139, 120, 134, 108, 132, 121, 111,
  // 123, 140, 137, 120, 125, 131, 118, 120, 120, 136, 129, 127, 116, 138, 128, 133, 122, 131, 128,
  // 140,  138, 134, 120, 126, 109, 137, 128, 133, 122, 131, 128, 140, 138, 134, 120, 126, 109, 137,
  // 111, 115, 117, 130, 113, 126, 115, 124, 125, 118, 115, 128, 123, 129, 128, 120, 115, 134, 118, 135, 134`;
  inputNumbers = `0, 5, 0, 0, 0, 1, 2, 1, 0, 1, 0,
   1, 0, 2, 1, 1, 1, 2, 1, 1, 1, 2 ,0
   , 1, 1, 0, 3, 1, 1, 2, 1, 2, 1, 3, 0
   , 1, 0, 3, 2, 0, 1, 1, 2, 0, 1, 5, 0, 0, 0, 2, 1,
    0, 2, 1, 1, 2, 1, 1, 1, 2, 1, 0, 1, 1, 3, 3, 1
    , 2, 1, 0, 0, 0, 3, 0, 3, 1, 0, 2, 1, 1, 4, 0, 0, 0, 2, 1, 1, 0, 2, 3, 2, 0, 2, 3, 2, 2, 3, 0, 1, 2`;
  tableNumbers: Array<Row>;
  showTable = false;
  constructor(private tvimsService: TvimsService) {
    this.tableNumbers = tvimsService.NumbersTable;
    this.tvimsService.newNumbersSet.subscribe(() => {
      this.tableNumbers = tvimsService.NumbersTable;
    });
  }

  setNewNumbers(): void {
    this.tvimsService.setNewNumbers(this.inputNumbers);
  }

  showTableClick(): void {
    this.showTable = !this.showTable;
  }
}
