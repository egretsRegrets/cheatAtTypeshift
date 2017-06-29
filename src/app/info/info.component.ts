import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  @Input() showInfo;

  infoShowHow = false;
  infoMenuSelect = function(event) {
    const classList = Array.prototype.slice.call(event.target.classList);
    if (classList.includes('menu-item__how-to') && this.infoShowHow === true) {
      return console.log('do nothing -- how-to');
    } else if (classList.includes('menu-item__about') && this.infoShowHow === false) {
      return console.log('do nothing -- about');
    } else if (classList.includes('menu-item__how-to')) {
      return this.infoShowHow = true;
    } else if (classList.includes('menu-item__about')) {
      return this.infoShowHow = false;
    }
  };

}
