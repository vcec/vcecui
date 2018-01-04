import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getAnimationDelay(i,col){
  	return {'animation-delay': ((i+1)%(col+1))*2/10 + 's'};
  }
}
