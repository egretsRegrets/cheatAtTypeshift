import { Component, OnInit } from '@angular/core';
import { WordsList } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cheat at Typeshift';

  showInfo: boolean;
  hideInfo: boolean;

  masterWordList: string[];
  masterWordListLengths: {};
  resultWords: string[][] = [];
  strickenWords: string[] = [];
  strickenLetters: string[][] = [];

  // real use word seed list:
  // wordListSeed = [['a']];
  // simple examp value wordlist: 
  // wordListSeed = [['c','b','m'],['a'],['t','d']];

  // complex examp value wordlist, few results: 
  // wordListSeed = [['b','s','i'],['i','m'],['o','t','b','g'],['p','c','i','w'],['i','s','b','o'],['y','g','m','e']];

  // complex examp value wordlist, more results: 
  
  
  wordListSeed = [
    ['g','e','b','s'],
    ['d','n','a','r','e'],
    ['c','a','g','i','r'],
    ['r','u','b','v'],
    ['l','e','a','i'],
    ['d','e','f','c','n'],
    ['d','s','o','g','y']
  ];
  
  
  // examp from TS site
  
  /*
  wordListSeed = [
    ['s','w','g'],
    ['r','p','o'],
    ['e','r'],
    ['a','l','d'],
    ['t','l','s']
  ];
  */

  getRangeByLength;
  resolveWords;
  resultsToCharArrays;
  linearSearch;
  compareWords;

  scrollIt = (destination: HTMLElement, duration: number = 500, easing: string = 'linear', documentHeight, callback) => {

    // easing types for testing purposes
    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };
    // startPosition is # of px of current doc vertical scroll
    // startTime is time marker at function call
    const startPosition = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    // doc height stores the largest of these values
    // window height gets any of the values "or'd"
    /*
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    */
    const windowHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;
    // destinationOffset is #of px from el to top of el parent, minus some room for aesthetics
    const destinationOffset = destination.offsetTop - 100;
    // destinationOffsetToScroll if the distance from the top of the document to the destination
      // is less than the viewport height this is the difference of doc height and viewport height
      // else this is just the travel from destination to its parent
    const destinationOffsetToScroll = Math.round(
      documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset
    );
    // if requestAnimationFram isn't available (Safari) skip animation and just use window.scroll()
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }
    // main scrolling function
    function scroll (){
      // now is cur time at each frame
      // time gets the smaller of nums: 1 or elapsed time
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      // for testing purposes: run easing method with name matching easing param name
      const timeFunction = easings[easing](time);
      // incremental scroll
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - startPosition)) + startPosition));
      // if we get our destination to the top of the doc than exit to callback
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback){
          callback();
        }
        return;
      }

      // call scroll on each successive frame
      requestAnimationFrame(scroll);
    }

    scroll();

    console.log(`
      startPosition: ${startPosition},
      startTime: ${startTime},
      documentHeight: ${documentHeight},
      windowHeight: ${windowHeight},
      destinationOffsetToScroll: ${destinationOffsetToScroll},
      destinationOffset: ${destinationOffset}
    `);
  };

  viewportToResults = () => {
    // get the destination to scroll to
    const destinationElement = <HTMLElement> document.getElementsByClassName('resultWordsContainer')[0];

    // before we call scrolling function we should check that resultWords is not empty,
      // else return without scrolling
      // if it has some content then we should make sure at least some .resultWord 's have been populated
        // if we don't see the .resultWord div's in a time frame we should also return

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    // call scrolling function, args: destination, scroll duration, easing type, callback
    this.scrollIt(
      destinationElement,
      600,
      /*'easeOutQuad'*/ 'linear',
      documentHeight,
      () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  };

  toggleShowInfo = () => {
    if(!this.showInfo) {
      this.showInfo = true;
      if (this.hideInfo){
        this.hideInfo = false;
      }
    } else {
      this.showInfo = false;
      this.hideInfo = true;
    }
  };
  addSlot = function(){
    if (this.wordListSeed.length < 7) {
      if (this.strickenWords.length) {
        this.strickenWords = [];
        this.strickenLetters = [];
        this.resultWords = [];
      }
      this.wordListSeed.push(['a']);
      return;
    }
    return;
  };
  addLetter = function(letterPlace: string[]){
    letterPlace.push('a');
  };
  removeSlot = function (){
    if (this.wordListSeed.length > 1){
      this.wordListSeed.splice(
        this.wordListSeed.indexOf(this.wordListSeed.length - 1),
      1);
    }
  };
  removeLetter = function (letterPlace){
    if(letterPlace.length > 1) {
      letterPlace.splice(
        letterPlace.indexOf(letterPlace.length - 1),
      1);
    }
  };
  alterUserWords = (event) => {
    const toggle = event.currentTarget;
    const wordParentEl = event.currentTarget.parentElement.getElementsByTagName('h1');
    const wordArray = [].slice.call(wordParentEl[0].children).map((div) => div.querySelector('span').innerHTML);
    const word = wordArray.join('');
    
    if(toggle.classList.contains('toggle__word--unused')){
      toggle.classList.remove('toggle__word--unused');
      toggle.classList.add('toggle__word--used');
      this.strickenWords.push(word);
      if(!this.strickenLetters.length){
        for(let i = 0; i < wordArray.length; i++){
          this.strickenLetters.push([]);
        }
      }
      for (let i = 0; i < wordArray.length; i++){
        this.strickenLetters[i].push(wordArray[i]);
      }
    }else{
      toggle.classList.remove('toggle__word--used');
      toggle.classList.add('toggle__word--unused');
      this.strickenWords.splice(this.strickenWords.indexOf(word), 1);
      for (let i = 0; i < wordArray.length; i++){
        this.strickenLetters[i].splice(
          this.strickenLetters[i].indexOf(wordArray[i]),
        1);
      }
    }
    this.scoreResultWords();
  };
  scoreResultWords = () => {
    let scoredWords: {}[] = [];
    if (this.strickenWords.length){
      for (let wordArray of this.resultWords){
        let score = 0;
        for (let letter = 0; letter < wordArray.length; letter++){
          if ( this.strickenLetters[letter].includes(wordArray[letter]) ) {
            score += 1;
          }
        }
        scoredWords.push({wordArray, score});
      }
    }
    this.orderWords(scoredWords);
  };
  orderWords = (scoredWords) => {
    let orderedScores: {wordArray, score}[];
    let orderedWords: string[][] = [];
    if(scoredWords.length){
      orderedScores = scoredWords.sort(function(a, b) {
        return a.score - b.score;
      });
      for (let i = 0; i < this.resultWords.length; i++) {
        const thisWord = orderedScores[i].wordArray;
        orderedWords.push(thisWord);
      }
      this.resultWords = orderedWords;
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

    this.resultsToCharArrays = function(words){
      const arrayifiedWords = words.map(word => {
        let charArray: string[] = [];
        for (let letter of word){
          charArray.push(letter);
        }
        return charArray;
      });
      return arrayifiedWords;
    };

    this.resolveWords = function(){
        const {rangeStart, rangeEnd} = this.getRangeByLength(this.wordListSeed.length);
        const narrowWordList: string[] = this.masterWordList.slice(rangeStart, rangeEnd);
        const resultWordsStrings = this.linearSearch(narrowWordList);
        this.resultWords = this.resultsToCharArrays(resultWordsStrings);
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
