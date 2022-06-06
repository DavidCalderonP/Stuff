import {Component, OnInit} from '@angular/core';
import { trigger,
    state,
    style,
    animate,
    transition, } from "@angular/animations";

@Component({

inputs: ['hola','como','estas'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
    selector: 'app-parent',
    template: `
        <div>
            <h1>Counter Value: {{this.counter}}</h1>
            <input type="button" (click)="this.updateCounter()" value="Update Counter"/>
            <app-child></app-child>
        </div>
        <nav>
    <button type="button" (click)="toggle()">Toggle Open/Close</button>
  </nav>

  <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
    <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
  </div>

    `,
    styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

    counter = 0;
    isOpen = true;

    constructor() {
    }

    ngOnInit(): void {
        console.log()
    }

    updateCounter() {
        this.counter += 1;
    }



  toggle() {
    this.isOpen = !this.isOpen;
  }


}
