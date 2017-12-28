import { Component,OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {fadeOutAnimation} from '../../_animations/index';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [fadeOutAnimation]
})
export class LandingComponent implements OnInit {
	currentTime = new Date();
	
	ngOnInit() {
    	this.updateTime()
  	}

  	updateTime(){
		setInterval(() => {   
		this.currentTime =  new Date();
  		}, 1000);
	}
}
