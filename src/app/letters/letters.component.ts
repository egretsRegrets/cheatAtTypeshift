import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: 'letters.component.html',
  styleUrls: ['letters.component.scss']
})
export class LettersComponent{
  @Input() userLetterLength: number;
  @Input() wordListSeed;

  @Output() setWordLength = new EventEmitter();
  @Output() checkWordDisambig = new EventEmitter();
  @Output() addLetterSlot = new EventEmitter();
  @Output() addLetter = new EventEmitter();
  @Output() resolveWords = new EventEmitter();
}
