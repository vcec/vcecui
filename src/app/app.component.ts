import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pitney Bowes';

  newItem = {
    EndTime: null,
    StartTime: null
  };

  newItem1 = {
    EndTime: null,
    StartTime: null
  };
  ngOnInit() {

  }
}
