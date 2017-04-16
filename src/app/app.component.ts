import { Component, OnInit } from '@angular/core';
import { WordsList } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cheat at Typeshift';
  alphaArray: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  wordList: string[];
  wordListLengths: {};
  stringListLengths: string;// for tests only
  userLetterLength: number;

  wordIndexRange: {};
  wordDisambig = [];
  
  getRangeByLength;
  setWordLength;
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
      this.wordIndexRange = this.getRangeByLength(this.userLetterLength);
      this.wordDisambig.length = this.userLetterLength;
    };

  }
}
