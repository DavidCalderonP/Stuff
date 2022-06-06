import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    //animations //https://angular.io/guide/animations
  selector: 'app-child',
  template: `
      <div><h3>{{this.executeFunction()}}</h3></div>
  `,
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    executeFunction() {
        console.log("App Rerendered")
        return "This is Child Component"
    }

}
