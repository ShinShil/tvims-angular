import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumbersComponent } from './input-numbers.component';

describe('InputNumbersComponent', () => {
  let component: InputNumbersComponent;
  let fixture: ComponentFixture<InputNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
