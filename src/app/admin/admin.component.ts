import {Component, OnInit} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUserId = '';

  constructor(private _cookieService: CookieService) {
    this.currentUserId = this._cookieService.get('userId');
  }

  ngOnInit() {
  }

  signOut() {
    this._cookieService.removeAll();
  }

}
