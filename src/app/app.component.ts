import { Component, OnChanges, SimpleChanges, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      console.log(propName);
    }
  }
  name = 'Angular ' + VERSION.major;
}
