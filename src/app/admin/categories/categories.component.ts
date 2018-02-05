import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {NgForm} from '@angular/forms';
import {Config} from '../../services/config.service';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {DialogService} from 'ng2-bootstrap-modal';
import {ToastsManager} from 'ng2-toastr';
import {ConfirmComponent} from '../confirmComponent/confirm.component';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  @ViewChild('f') groupForm: NgForm;
  totalRecords: number = 0;
  currentPageIndex: number;


  constructor(private dataService: DataService, private config: Config, private router: Router,
              private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {

    this.route.params.subscribe((params) => {
      this.currentPageIndex = +params['page'];
      this.getAllCategories();
    });

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    this.currentPageIndex = +this.currentPageIndex;
    this.dataService.getAllCategories(this.currentPageIndex).subscribe((res) => {
      if (res['count'] > 0) {
        this.categories = res['data'];
        this.totalRecords = res['totalRecords'];
      }
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.message);
      }
    });
  }

  createCat() {
    this.router.navigate(['/admin/categories/create']);
  }

  editCat(category) {
    this.router.navigate(['/admin/categories/update/', category._id]);
  }

  deleteCat(category) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this category?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deleteSolution(category['_id']).subscribe((res) => {
          this.getAllCategories();
          this.toastr.success('Category deleted successfully.', null, {toastLife: 3000});
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
