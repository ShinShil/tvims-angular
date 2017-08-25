import { ValuesCounter } from './business/values-counter';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class TvimsService {

  newNumbersSet = new Subject<void>();
  private numbersTable: Array<Row> = [];
  private values: Values = undefined;
  private graphs: Graphs = undefined;
  private hypothesis: Hypothesis = undefined;

  setNewNumbers(numbers: string): void {
    const arr = numbers.replace(/\r?\n|\r/g, '').replace(/\s/g, '').split(',').sort();
    this.setNumbersTable(arr);
    this.setValues();
    this.setGraphs();
    this.setHypothesis();
    this.newNumbersSet.next();
  }

  get NumbersTable(): Array<Row> {
    return this.numbersTable && this.numbersTable.length !== 0 ? Object.create(this.numbersTable) : undefined;
  }

  get Values(): Values {
    return this.values ? Object.create(this.values) : undefined;
  }

  get Graphs(): Graphs {
    return this.Graphs;
  }

  get Hypothesis(): Hypothesis {
    return this.hypothesis;
  }

  private setValues(): void {
    const counter = new ValuesCounter(this.numbersTable);
    this.values = counter.count();
  }

  private setGraphs(): void {
    this.graphs = undefined;
  }

  private setHypothesis(): void {
    this.hypothesis = undefined;
  }

  private setNumbersTable(arr: Array<string>): void {
    this.numbersTable = [];
    const arrayLength = arr.length;
    while (arr.length) {
      const t = arr.map(v => v === arr[0] ? v : '').filter(String);
      this.numbersTable.push({
        amount: t.length,
        val: +t[0],
        p: 0,
        pSumm: 0
      });
      arr = arr.filter(v => v !== t[0]);
    }
    this.numbersTable.forEach((v, i, vs) => {
      const prevItem = i ? vs[i - 1] : vs[0];
      v.p = v.amount / arrayLength;
      v.pSumm = prevItem.pSumm + v.p;
    });
  }
}
