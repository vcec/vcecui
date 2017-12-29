import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {slideInRight} from '../../_animations/index';
import {DataService} from '../../services/dataService.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [slideInRight]

})
export class HomepageComponent implements OnInit {
  @ViewChild('owlInfo') owlInfo: OwlCarousel;
  @ViewChild('owlMobile') owlMobile: OwlCarousel;
  backendUrl = 'http://10.120.89.47:3000/';

  products: any[] = [];
  testimonials: any[] = [];
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

}
