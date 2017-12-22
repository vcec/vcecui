import { Component, OnInit ,ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	@ViewChild('owlInfo') owlInfo: OwlCarousel;
	@ViewChild('owlMobile') owlMobile: OwlCarousel;
  constructor() { }

  ngOnInit() {
  }

  goNext(){
  	this.owlInfo.next();
  	this.owlMobile.next();
  }
  goPrev(){
  	this.owlInfo.previous();
  	this.owlMobile.previous();
  }
}
