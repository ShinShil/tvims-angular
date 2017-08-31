import { TvimsService } from './tvims.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  inputNumbers = '';
  tableNumbers: Array<RowInterval | Row>;
  showTable = false;
  activeVar = 1;
  ryadType = 'intervalnii';
  constructor(private tvimsService: TvimsService) {
    this.tableNumbers = tvimsService.NumbersTable;
    this.tvimsService.newNumbersSet.subscribe(() => {
      this.tableNumbers = tvimsService.NumbersTable;
    });
    this.setVariant1();
  }

  setNewNumbers(): void {
    if ('discretnii' === this.ryadType) {
      this.tvimsService.setNewNumbersDiscretniiRyad(this.inputNumbers);
    } else {
      this.tvimsService.setNewNumbersIntervalniiRyad(this.inputNumbers);
    }
  }

  showTableClick(): void {
    this.showTable = !this.showTable;
  }

  setVariant1(): void {
    this.activeVar = 1;
    this.inputNumbers = `
    0, 5, 0, 0, 0, 1, 2, 1, 0, 1, 0,
    1, 0, 2, 1, 1, 1, 2, 1, 1, 1, 2 ,0
    , 1, 1, 0, 3, 1, 1, 2, 1, 2, 1, 3, 0
    , 1, 0, 3, 2, 0, 1, 1, 2, 0, 1, 5, 0, 0, 0, 2, 1,
     0, 2, 1, 1, 2, 1, 1, 1, 2, 1, 0, 1, 1, 3, 3, 1
     , 2, 1, 0, 0, 0, 3, 0, 3, 1, 0, 2, 1, 1, 4, 0, 0, 0, 2, 1, 1, 0, 2, 3, 2, 0, 2, 3, 2, 2, 3, 0, 1, 2
    `;
    this.ryadType = 'discretnii';
    this.setNewNumbers();
  }
  setVariant2(): void {
    this.activeVar = 2;
    this.inputNumbers = `
    120, 135, 116, 118, 133, 136, 125, 126, 119, 126, 129, 127, 129, 124, 127, 132, 126, 131, 127,
    130, 126, 124, 135, 127, 124, 123, 123, 130, 132, 143, 122, 139, 120, 134, 108, 132, 121, 111,
    123, 140, 137, 120, 125, 131, 118, 120, 120, 136, 129, 127, 116, 138, 128, 133, 122, 131, 128,
    140,  138, 134, 120, 126, 109, 137, 128, 133, 122, 131, 128, 140, 138, 134, 120, 126, 109, 137,
    111, 115, 117, 130, 113, 126, 115, 124, 125, 118, 115, 128, 123, 129, 128, 120, 115, 134, 118, 135, 134
    `;
    this.tvimsService.intervalSize = 5;
    this.ryadType = 'intervalnii';
    this.setNewNumbers();
  }
  setVariant3(): void {
    this.activeVar = 3;
    this.inputNumbers = `
    74, 630, 1120, 79, 512, 128, 515, 1320, 209, 0, 511, 3000, 511, 241, 0, 2700, 1500,
     2600, 1811, 48, 1600, 809, 25, 910, 560, 700, 24, 699, 1631, 1140, 75, 1100, 525, 18,
      320, 0, 240, 25, 1901, 900, 810, 810, 731, 511, 510, 800, 754, 2200, 549, 280, 14, 0, 1310, 1100
      , 810, 1655, 412, 750, 25, 1500, 420, 501, 310, 1100, 630, 250, 965, 930, 1730, 3200, 963, 5, 25,
       2140, 500,  32, 740, 1729, 17, 1300, 240, 240, 820, 16, 3600, 800, 1900, 1300, 0, 241
    `;
    this.tvimsService.intervalSize = 450;
    this.ryadType = 'intervalnii';
    this.setNewNumbers();
  }
}
