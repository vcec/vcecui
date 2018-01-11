import {Component, OnInit, AfterViewInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/index';
import {DataService} from "../../services/dataService.service";
import {Config} from "../../services/config.service";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [fadeInAnimation]
})
export class CategoryComponent implements OnInit {
  groupName: string;
  products: any[] = [];
  groupDetail = {};
  headerImage: SafeUrl = "";

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    console.log(this.route);
    this.route.params.subscribe(params => {
      this.groupName = params['groupName'];
    });
  }

  ngOnInit() {
    this.dataService.getAllProductsByGroupName(this.groupName).subscribe((res) => {
      this.products = res['data'];
      console.log(this.products);
    }, (err) => {

    });

    this.dataService.getProductGroupByGroupName(this.groupName).subscribe((res) => {
      this.groupDetail = res['data'];
      this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.config.serverUrl}${this.groupDetail['coverImage']})`);
      console.log(this.headerImage);
      console.log(this.groupDetail);
    }, (err) => {

    });

  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getAnimationDelay(i, col) {
    return {'animation-delay': ((i + 1) % (col + 1)) * 2 / 10 + 's'};
  }
}
