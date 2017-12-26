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

	products: any[] = [
				    {
				      "name": "Mailing & Shipping",
				      "img": "mailingshipping.png",
				      "hoverImg":"mailingshipping_hover.png"
				    },
				    {
				      "name": "Location Intelligence",
				      "img": "li.png",
				      "hoverImg":"li_hover.png"
				    },
				    {
				      "name": "Customer Information Management",
				      "img": "cim.png",
				      "hoverImg":"cim_hover.png"
				    },
				    {
				      "name": "Global ECommerce",
				      "img": "ecom.png",
				      "hoverImg":"ecom_hover.png"
				    },
				    {
				      "name": "Customer Engagement",
				      "img": "ces.png",
				      "hoverImg":"ces_hover.png"
				    }
				    
  	];
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
