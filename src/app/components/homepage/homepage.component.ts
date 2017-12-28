import { Component, OnInit ,ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {slideInRight} from '../../_animations/index';




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [slideInRight]
  
})
export class HomepageComponent implements OnInit {
  @ViewChild('owlInfo') owlInfo: OwlCarousel;
  @ViewChild('owlMobile') owlMobile: OwlCarousel;
  backendUrl = 'http://10.120.88.222:3000/';

  products: any[] = [];
  testimonials: any[] = [];

  /*
    products: any[] = [
      {
        'name': 'Mailing & Shipping',
        'img': 'mailingshipping.png',
        'hoverImg': 'mailingshipping_hover.png'
      },
      {
        'name': 'Location Intelligence',
        'img': 'li.png',
        'hoverImg': 'li_hover.png'
      },
      {
        'name': 'Customer Information Management',
        'img': 'cim.png',
        'hoverImg': 'cim_hover.png'
      },
      {
        'name': 'Global ECommerce',
        'img': 'ecom.png',
        'hoverImg': 'ecom_hover.png'
      },
      {
        'name': 'Customer Engagement',
        'img': 'ces.png',
        'hoverImg': 'ces_hover.png'
      }

    ];
  */

  categories: any[] = [];


  constructor(private dataService: DataService) {

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
        this.testimonials = response['data'];
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

}
