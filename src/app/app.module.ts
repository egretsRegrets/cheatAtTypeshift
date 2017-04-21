import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WordsList } from './shared';

import { AppComponent } from './app.component';
import { LettersComponent } from './letters/letters.component';

@NgModule({
  declarations: [
    AppComponent,
    LettersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WordsList],
  bootstrap: [AppComponent]
})
export class AppModule { }
