import { FormsModule } from '@angular/forms';
import { TvimsService } from './tvims.service';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HypothesisComponent } from './hypothesis/hypothesis.component';
import { TableNumbersComponent } from './app-components/table-numbers/table-numbers.component';
import { TableNumbersIntervalComponent } from './app-components/table-numbers-interval/table-numbers-interval.component';
import { BarChartComponent } from './graphs/charts/bar-chart/bar-chart.component';
import { EmpericFuncComponent } from './graphs/charts/emperic-func/emperic-func.component';

const routes: Routes = [
  { path: '', component: ValuesComponent, pathMatch: 'full' },
  { path: 'values', component: ValuesComponent },
  { path: 'graphs', component: GraphsComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'gistogram' },
    { path: 'gistogram', component: BarChartComponent },
    { path: 'emperic-func', component: EmpericFuncComponent }
  ] },
  { path: 'hypothesis', component: HypothesisComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    GraphsComponent,
    HypothesisComponent,
    TableNumbersComponent,
    TableNumbersIntervalComponent,
    BarChartComponent,
    EmpericFuncComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TvimsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
