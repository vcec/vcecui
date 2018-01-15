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
  isItForGroup = false;

  constructor(private dataService: DataService, private config: Config,
              private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    if (this.router.url.indexOf('/category/group') != -1) {
      this.isItForGroup = true;
    }
    this.route.params.subscribe(params => {
      this.groupName = params['groupName'];
    });
  }

  ngOnInit() {
    if (this.isItForGroup) {
      this.dataService.getAllProductsByGroupName(this.groupName).subscribe((res) => {
        this.products = res['data'];
        console.log(this.products);
      }, (err) => {

      });

      this.dataService.getProductGroupByGroupName(this.groupName).subscribe((res) => {
        this.groupDetail = res['data'];
        this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.config.serverUrl}${this.groupDetail['coverImage']})`);
      }, (err) => {

      });
    } else {
      this.dataService.getAllProductsByCategoryName(this.groupName).subscribe((res) => {
        this.products = res['data'];
        console.log(this.products);
      }, (err) => {

      });

      this.dataService.getCatDetailsByCatName(this.groupName).subscribe((res) => {
        this.groupDetail = res['data'];
          console.log(this.groupDetail);
         this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.config.serverUrl}${this.groupDetail['coverImage']})`);
      }, (err) => {

      });
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getAnimationDelay(i, col) {
    return {'animation-delay': ((i + 1) % (col + 1)) * 2 / 10 + 's'};
  }
}