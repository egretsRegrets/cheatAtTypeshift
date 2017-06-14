import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements Input {
  @Input() words;

  @Output() strikeWord = new EventEmitter();

}
