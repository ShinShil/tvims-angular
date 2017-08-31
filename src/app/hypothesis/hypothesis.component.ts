import { TvimsService } from '../tvims.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hypothesis',
  templateUrl: './hypothesis.component.html',
  styleUrls: ['./hypothesis.component.scss']
})
export class HypothesisComponent implements OnInit {


  constructor(private tvimsService: TvimsService) { }

  ngOnInit() {
  }

}
