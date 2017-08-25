import { TvimsService } from '../tvims.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent {
  values: Values;

  constructor(private tvimsService: TvimsService) {
    this.values = tvimsService.Values;
    this.tvimsService.newNumbersSet.subscribe(() => this.values = tvimsService.Values);
  }
}
