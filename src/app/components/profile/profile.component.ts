import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  getAnimationDelay(i,col){
  	return {'animation-delay': ((i+1)%(col+1))*2/10 + 's'};
  }

  openVideo(content){
  	this.modalService.open(content, { windowClass: 'video-modal modal-fullscreen'});
  }
}
