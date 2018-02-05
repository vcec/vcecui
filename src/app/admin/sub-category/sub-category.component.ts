import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {DataService} from '../../services/dataService.service';
import {Config} from '../../services/config.service';
import {ToastsManager} from 'ng2-toastr';
import {ConfirmComponent} from '../confirmComponent/confirm.component';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  subCategories = [];
  categories = [];
  totalRecords: number = 0;
  currentPageIndex: number;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,
              private config: Config, public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.currentPageIndex = +params['page'];
      this.getAllSubCategories();
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllSubCategories();
    this.dataService.getAllCategories().subscribe((res) => {
      this.categories = res['data'];
    }, (err) => {

    });
  }

  getAllSubCategories() {
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    this.currentPageIndex = +this.currentPageIndex;
    this.dataService.getAllSubcategories(this.currentPageIndex).subscribe((res) => {
      this.subCategories = res['data'];
      this.totalRecords = res['totalRecords'];
    }, (err) => {

    });
  }

  getMainCategory(mainCatId) {
    var cat = this.categories.filter((v, i) => {
      return v._id === mainCatId ? true : false;
    });
    if (cat.length > 0) {
      return cat[0].category_name;
    } else {
      return 'Not Found';
    }
  }

  createSubCategory() {
    this.router.navigate(['/admin/subCategory/create'], {relativeTo: this.route});
  }

  editSubcategory(subCategory) {
    this.router.navigate(['/admin/subCategory/update/', subCategory._id]);
  }

  deleteSubcategory(subCategory) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this sub category?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deleteSubCategory(subCategory['_id']).subscribe((res) => {
          this.toastr.success('SubCategory deleted successfully.', null, {toastLife: 3000});
          this.getAllSubCategories();
        }, (err) => {
          if (err.status === 0) {
            this.toastr.error('Server is Down.');
          } else {
            this.toastr.error(err.message);
          }
        });
      }
    });
  }
}
