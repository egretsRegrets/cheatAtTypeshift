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
      let narrowWordList: string[] = this.masterWordList.slice(rangeStart, rangeEnd);
      this.resultWords = mergeSort(narrowWordList, this.wordListSeed);

      console.log('solutions are', this.resultWords);
    }

    function mergeSort(array: string[], userLetters: string[]): string[] {
      if (array.length <= 1 ){
          return array;
      }
      const middle = Math.floor(array.length / 2);
      const leftSide = array.slice(0, middle);
      const rightSide = array.slice(middle);
      return merge(mergeSort(leftSide, userLetters), mergeSort(rightSide, userLetters), userLetters);
    }

    function merge (leftSide: string[], rightSide: string[], userLetters): string[]{
      let mergedArray: string[] = [];
      const largerArrayLength = leftSide.length > rightSide.length ? leftSide.length : rightSide.length;
      for (let i  = 0; i < largerArrayLength; i++) {
          if(leftSide[i] && compareWords(leftSide[i], userLetters)) {
              mergedArray.push(leftSide[i]);
          }
          if(rightSide[i] && compareWords(rightSide[i], userLetters)) {
              mergedArray.push(rightSide[i]);
          }
      }
      return mergedArray;
    }

    function compareWords (collectionWord, userLetters) {
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
            return compareWords(collectionWord.slice(1), userLetters.slice(1));
          }
      }
    }
    
  }

}
