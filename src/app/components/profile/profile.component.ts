import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
	videos = [
		{'cover':'videoCover1.png','videoUrl':'emZ5EUhH18M'},
		{'cover':'videoCover2.png','videoUrl':'TnD74iHNlUI'},
		{'cover':'videoCover3.png','videoUrl':'1p0APPlxriE'}
	]
	videoUrl:SafeResourceUrl;
  constructor(private modalService: NgbModal,public sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  getAnimationDelay(i,col){
  	return {'animation-delay': ((i+1)%(col+1))*2/10 + 's'};
  }

  openVideo(content,vid){
  	let url= 'https://www.youtube.com/embed/'+ vid+'?autoplay=1';
  	console.log(url);
  	this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  	this.modalService.open(content, { windowClass: 'video-modal modal-fullscreen'});
  }
}
