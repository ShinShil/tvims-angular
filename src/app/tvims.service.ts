import { ValuesCounter } from './business/values-counter';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class TvimsService {

  newNumbersSet = new Subject<void>();
  intervalSize = 5;
  private numbersTable: Array<Row> = [];
  private values: Values = undefined;
  private graphs: Graphs = undefined;
  private hypothesis: HypothesisDiscretnii | HypothesisInterval = undefined;
  private mode: 'discretnii' | 'intervalnii';

  setNewNumbersDiscretniiRyad(numbers: string): void {
    this.mode = 'discretnii';
    this.setNumbers(numbers, this.setTableFromDiscretniiRyad);
  }

  setNewNumbersIntervalniiRyad(numbers: string): void {
    this.mode = 'intervalnii';
    this.setNumbers(numbers, this.setTableFromIntervalniiRyad);
  }

  get NumbersTable(): Array<Row | RowInterval> {
    return this.numbersTable && this.numbersTable.length !== 0 ? Object.create(this.numbersTable) : undefined;
  }

  get Values(): Values {
    return this.values ? Object.create(this.values) : undefined;
  }

  get Graphs(): Graphs {
    return this.graphs ? this.graphs : undefined;
  }

  get Hypothesis(): HypothesisDiscretnii | HypothesisInterval {
    return this.hypothesis;
  }

  private setValues(): void {
    const counter = new ValuesCounter(this.numbersTable);
    this.values = counter.count();
  }

  private setGraphs(): void {
    this.graphs = {
      gistogramm: [],
      empericFunc: []
    };
    if (this.mode === 'discretnii') {
      for (const n of this.numbersTable) {
        this.graphs.gistogramm.push({
          x: n.val,
          y: n.amount
        });
        this.graphs.empericFunc.push({
          x: n.val,
          y: n.pSumm
        });
      }
    } else {
      this.graphs.empericFunc.push({
        x: (this.numbersTable as Array<RowInterval>)[0].intervalStart,
        y: 0
      });
      for (const n of (this.numbersTable as Array<RowInterval>)) {
        this.graphs.gistogramm.push({
          x: n.val,
          y: n.amount
        });
        this.graphs.empericFunc.push({
          x: n.intervalEnd,
          y: n.pSumm
        });
      }
    }
  }

  private setHypothesis(): void {
    this.hypothesis = undefined;
  }

  private setNumbers(numbers: string, setter: (arr: Array<string>) => void): void {
    const arr = numbers.replace(/\r?\n|\r/g, '').replace(/\s/g, '').split(',').map(Number)
    .sort((a, b) => a === b ? 0 : a > b ? 1 : -1).map(String);
    setter.bind(this)(arr);
    this.setValues();
    this.setGraphs();
    this.setHypothesis();
    this.newNumbersSet.next();
  }

  private setTableFromIntervalniiRyad(sortedArr: Array<string>): void {
    this.numbersTable = [];
    console.log(sortedArr);
    const numbers = sortedArr.map(Number);
    const arrayLength = sortedArr.length;
    const intervalSize = this.intervalSize;
    let intervalStart = numbers[0];
    let intervalEnd = intervalStart + intervalSize;
    while (intervalEnd <= numbers[numbers.length - 1]) {
      const numbersInInterval = numbers.filter(n => n >= intervalStart && n < intervalEnd);
      const middleValue = (intervalStart + intervalEnd) / 2;
      const p = numbersInInterval.length / arrayLength;
      this.numbersTable.push({
        amount: numbersInInterval.length,
        p,
        pSumm: p + (this.numbersTable.length ? this.numbersTable[this.numbersTable.length - 1].pSumm : 0),
        val: middleValue,
        intervalEnd,
        intervalStart
      } as RowInterval);
      intervalStart = intervalEnd;
      intervalEnd += intervalSize;
    }
  }

  private setTableFromDiscretniiRyad(arr: Array<string>): void {
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
