import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {DataService} from '../../services/dataService.service';

import { trigger, state, animate, transition, style } from '@angular/animations';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [trigger('fadeInAnimation', [
 
        // route 'enter' transition
        transition(':enter', [
 
            // css styles at start of transition
            style({ opacity: 0 }),
 
            // animation and styles at end of transition
            animate('0.7s', style({ opacity: 1 }))
        ]),
    ])]
  
})
export class HomepageComponent implements OnInit {
  @ViewChild('owlInfo') owlInfo: OwlCarousel;
  @ViewChild('owlMobile') owlMobile: OwlCarousel;

  products: any[] = [];

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
