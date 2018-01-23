import {Component, OnInit, AfterViewInit,ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../_animations/index';
import {DataService} from '../../services/dataService.service';
import {Config} from '../../services/config.service';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})
export class CategoryComponent implements OnInit {
  groupName: string;
  products: any[] = [];
  groupDetail = {};
  headerImage: SafeUrl = '';
  isItForGroup = false;
  subCategories = [];
  selectedSubCategories = [];

  constructor(private dataService: DataService, private config: Config,
              private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    if (this.router.url.indexOf('/category/group') != -1) {
      this.isItForGroup = true;
    }
    this.route.params.subscribe(params => {
      this.groupName = params['groupName'];
    });
    this.dataService.setCurrentUrl(this.router.url);
  }

  ngOnInit() {
    if (this.isItForGroup) {
      this.dataService.getAllProductsByGroupName(this.groupName).subscribe((res) => {
        this.products = res['data'];
        console.log(this.products);
      }, (err) => {
        console.log(err);
      });

      this.dataService.getProductGroupByGroupName(this.groupName).subscribe((res) => {
        this.groupDetail = res['data'];
        this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.config.serverUrl}${this.groupDetail['coverImage']})`);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.dataService.getAllProductsByCategoryName(this.groupName).subscribe((res) => {
        this.products = res['data'];
        console.log(this.products);
      }, (err) => {
        console.log(err);
      });

      this.dataService.getCatDetailsByCatName(this.groupName).subscribe((res) => {
        this.groupDetail = res['data'];
        // get all subcategories
        this.dataService.getSubcategoriesOfMainCat(this.groupDetail['_id']).subscribe((result) => {
          this.subCategories = result['data'];
          this.subCategories.unshift({name: 'All'});
        }, (err) => {
          console.log(err);
        });
        this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.config.serverUrl}${this.groupDetail['coverImage']})`);
      }, (err) => {
        console.log(err);
      });
    }
  }

  changeProducts(cat) {
    if (this.selectedSubCategories.indexOf(cat.activeId) !== -1) {
      this.selectedSubCategories.splice(this.subCategories.indexOf(cat.activeId), 1);
    }
    this.selectedSubCategories.push(cat.nextId);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getAnimationDelay(i, col) {
    return {'animation-delay': ((i + 1) % (col + 1)) * 2 / 10 + 's'};
  }
}
