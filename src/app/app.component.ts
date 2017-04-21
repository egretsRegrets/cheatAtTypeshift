import { Component, OnInit } from '@angular/core';
import { WordsList } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'Cheat at Typeshift';
  masterWordList: string[];
  masterWordListLengths: {};
  userLetterLength: number;
  resultWords: string[] = [];

  wordListSeed = [];

  addLetter;
  getRangeByLength;
  setWordLength;
  resolveWords;
  checkWordDisambig(){
    if (this.wordListSeed.length){
      return true;
    }else {
      return false;
    }
  };


  constructor( private allPossibleWords: WordsList ) {}
  ngOnInit() {
    this.masterWordList = this.allPossibleWords.wordList.words;
    this.masterWordListLengths = this.allPossibleWords.wordList.lengths;

    this.getRangeByLength = function(num){
      let rangeStart;
      if (num > 2) {
        rangeStart = this.masterWordListLengths[num.toString() - 1];
      }
      const rangeEnd = (this.masterWordListLengths[num.toString()]) - 1;

      return {
        'rangeStart': rangeStart || 0,
        'rangeEnd': rangeEnd
      };
    };

    this.setWordLength = function(){
      this.wordListSeed = [];
      for (let i = 0; i < this.userLetterLength; i++) {
        this.wordListSeed.push(['a']);
      }
    };

    this.addLetter = function(letterPlace: string[]){
      letterPlace.push('a');
    };

    this.resolveWords = function(){
      const {rangeStart, rangeEnd} = this.getRangeByLength(this.userLetterLength);
      for (let word = rangeStart; word < rangeEnd; word++) {
        const curWord = this.masterWordList[word];
        let wordAsArray: string[] = [];
        for (let curUserSlotIndex = 0; curUserSlotIndex < this.wordListSeed.length; curUserSlotIndex++) {
          const curUserSlot = this.wordListSeed[curUserSlotIndex];
          const curListWordLetter = curWord[curUserSlotIndex];
          for (let curUserLetterIndex = 0; curUserLetterIndex < curUserSlot.length; curUserLetterIndex++) {
            const curUserLetter = curUserSlot[curUserLetterIndex];
            if ( curUserLetter === curListWordLetter ) {
              wordAsArray.push(curUserLetter);
            }
          }
          if ( wordAsArray.length === curWord.length ){
            this.resultWords.push(curWord);
          }
        }
      }
      console.log('solutions are', this.resultWords);
    };
    
  }

}
