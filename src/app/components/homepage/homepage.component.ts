import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {fadeInAnimation} from '../../_animations/index';
import {DataService} from '../../services/dataService.service';
import {Config} from "../../services/config.service";

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [fadeInAnimation]

})
export class HomepageComponent implements OnInit {
  @ViewChild('owlInfo') owlInfo: OwlCarousel;
  @ViewChild('owlMobile') owlMobile: OwlCarousel;
  fixedNavbar = false;
  lastScroll = 0;
  products: any[] = [];
  testimonials: any[] = [];
  categories: any[] = [];


  constructor(private dataService: DataService, private config: Config) {

  }

  ngOnInit() {
    // get all product groupsø
    this.dataService.getAllGroups().subscribe((response) => {
      if (response['count'] > 0) {
        this.products = response['data'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });

    this.dataService.getAllCategories().subscribe((response) => {
      if (response['count'] > 0) {
        this.categories = response['data'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });

    this.dataService.getAllTestimonials().subscribe((response) => {
      if (response['count'] > 0) {
        setTimeout(() => {
          this.testimonials = response['data'];
        }, 500);
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });
  }


  goNext() {
    this.owlInfo.next();
    this.owlMobile.next();
  }

  goPrev() {
    this.owlInfo.previous();
    this.owlMobile.previous();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let pageoffset = window.pageYOffset;
    if(pageoffset>=150){
      $('.return-to-top').fadeIn(200);

    }else{
      $('.return-to-top').fadeOut(200);
    }

    if(pageoffset > this.lastScroll ||pageoffset==0){
      this.fixedNavbar = false;

    }else{
      this.fixedNavbar = true;

    }

     this.lastScroll = pageoffset;
  }
}
