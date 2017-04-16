import { Injectable } from '@angular/core';

declare var require: any;

@Injectable()
export class WordsList {
    wordList = require('./words.json');
}
