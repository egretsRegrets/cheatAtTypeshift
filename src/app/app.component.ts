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
  resultWords: string[] = [];

  wordListSeed = [['a']];

  getRangeByLength;
  resolveWords;
  linearSearch;
  compareWords;

  addSlot = function(){
    this.wordListSeed.push(['a']);
  };
  addLetter = function(letterPlace: string[]){
    letterPlace.push('a');
  };
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

    this.resolveWords = function(){
        const {rangeStart, rangeEnd} = this.getRangeByLength(this.wordListSeed.length);
        const narrowWordList: string[] = this.masterWordList.slice(rangeStart, rangeEnd);
        this.resultWords = this.linearSearch(narrowWordList);
        console.log('solutions are', this.resultWords);
    };

    this.linearSearch = function(wordList: string[]): string[]{
        let parsedWordList: string[] = [];
        for (let i  = 0; i < wordList.length; i++) {
          if(this.compareWords(wordList[i])) {
             parsedWordList.push(wordList[i]);
          }
        }
        return parsedWordList;
    };

    this.compareWords = function(collectionWord, userLetters = this.wordListSeed) {
        if (collectionWord.length <= 0){
            console.log("returning from compareWords with true"); // for tests
            return true;
        }
        const userLetterSlot = userLetters[0];
        for( let letterIndex = 0; letterIndex <= userLetterSlot.length; letterIndex++){
            if (letterIndex === userLetterSlot.length){
                return false;
            }
            if (collectionWord[0] === userLetterSlot[letterIndex]){
              return this.compareWords(collectionWord.slice(1), userLetters.slice(1));
            }
        }
    };

  }

}
