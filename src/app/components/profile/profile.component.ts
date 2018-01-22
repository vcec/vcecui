import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {fadeInAnimation} from '../../_animations/index';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/dataService.service';
import {Config} from '../../services/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnInit {
  productId: string;
  productDetails = {};
  articlesAndOthers = [];
  caseStudyAndWhitePaper = [];
  videoUrl: SafeResourceUrl;

  constructor(private modalService: NgbModal, public sanitizer: DomSanitizer, private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
  }

  sanitizeUrl(url, type?) {
    if (type == 'youtube') {
      let video_id = url.split('v=')[1].split('&')[0];
      let newUrl = 'https://www.youtube.com/embed/' + video_id;
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${newUrl}`);
    } else if (type == 'demoUrl') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}`);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.config.serverUrl}${url}`);
    }
  }

  ngOnInit() {
    this.dataService.getPortFolio(this.productId).subscribe((res) => {
      this.productDetails = res['data'];
      setTimeout(() => {
        this.articlesAndOthers = this.productDetails['articles'].concat(this.productDetails['others']);
        console.log(this.articlesAndOthers);
        this.caseStudyAndWhitePaper = this.productDetails['caseStudies'].concat(this.productDetails['whitePapers']);
        console.log(this.caseStudyAndWhitePaper);
      });
      console.log(this.productDetails);
    }, (err) => {
      console.log(err);
    });
  }

  getAnimationDelay(i, col) {
    return {'animation-delay': ((i + 1) % (col + 1)) * 2 / 10 + 's'};
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  openVideo(content, vid) {
    this.videoUrl = vid;
    this.modalService.open(content, {windowClass: 'video-modal modal-fullscreen'});
  }

}
