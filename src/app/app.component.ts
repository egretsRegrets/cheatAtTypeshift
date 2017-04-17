import { Component, OnInit } from '@angular/core';
import { WordsList } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ]
})
export class AppComponent implements OnInit {
  title = 'Cheat at Typeshift';
  alphaArray: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  wordList: string[];
  wordListLengths: {};
  stringListLengths: string;// for tests only
  userLetterLength: number;
  resultWords: string[] = [];

  wordDisambig = [];

  addLetter;
  getRangeByLength;
  setWordLength;
  resolveWords;
  checkWordDisambig(){
    if (this.wordDisambig.length){
      return true;
    }else{
      return false;
    }
  };


  constructor( private words: WordsList ) {}
  ngOnInit() {
    this.wordList = this.words.wordList.words;
    this.wordListLengths = this.words.wordList.lengths;
    this.stringListLengths = JSON.stringify(this.words.wordList.lengths);// for tests only

    this.getRangeByLength = function(num){
      let rangeStart;
      if (num > 2) {
        rangeStart = this.wordListLengths[num.toString() - 1];
      }
      const rangeEnd = (this.wordListLengths[num.toString()]) - 1;

      return {
        'rangeStart': rangeStart || 0,
        'rangeEnd': rangeEnd
      };
    };

    this.setWordLength = function(){
      this.wordDisambig = [];
      for (let i = 0; i < this.userLetterLength; i++) {
        this.wordDisambig.push(['a']);
      }
    };

    this.addLetter = function(letterPlace: string[]){
      letterPlace.push('a');
    };

    this.resolveWords = function(){
      const {rangeStart, rangeEnd} = this.getRangeByLength(this.userLetterLength);
      for (let word = rangeStart; word < rangeEnd; word++) {
        const curWord = this.wordList[word];
        let wordAsArray: string[]= [];
        for (let curUserSlotIndex = 0; curUserSlotIndex < this.wordDisambig.length; curUserSlotIndex++) {
          const curUserSlot = this.wordDisambig[curUserSlotIndex];
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
