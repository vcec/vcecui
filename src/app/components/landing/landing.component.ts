import { Component,OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
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
