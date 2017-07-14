import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: 'letters.component.html',
  styleUrls: ['letters.component.scss']
})
export class LettersComponent {

  @Input() wordListSeed;
  @Input() strickenLetters;

  @Output() setWordLength = new EventEmitter();
  @Output() checkWordDisambig = new EventEmitter();
  @Output() addSlot = new EventEmitter();
  @Output() addLetter = new EventEmitter();
  @Output() removeLetter = new EventEmitter();
  @Output() removeSlot = new EventEmitter();
  @Output() resolveWords = new EventEmitter();
  @Output() viewportToResults = new EventEmitter();

  trackByFn = function(index: number, item: string){
    return index;
  };

}
