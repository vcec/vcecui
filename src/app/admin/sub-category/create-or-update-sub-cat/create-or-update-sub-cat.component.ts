import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Config} from '../../../services/config.service';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/dataService.service';
import {NgForm} from '@angular/forms';
import {CookieService} from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-create-or-update-sub-cat',
  templateUrl: './create-or-update-sub-cat.component.html',
  styleUrls: ['./create-or-update-sub-cat.component.scss']
})
export class CreateOrUpdateSubCatComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  Id: string;
  categories = [];
  subCatToEdit = {};
  editState = false;
  addState = false;
  image: '';
  currentUser = '';
  token = '';
  imageUploadConfig = {};

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,
              private config: Config, public toastr: ToastsManager, vcr: ViewContainerRef, private cookieService: CookieService) {

    this.currentUser = this.cookieService.get('userId');
    this.token = this.cookieService.get('accessToken');
    this.route.params.subscribe(params => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);
    this.imageUploadConfig = {
      url: this.config.serverUrl + 'upload/uploadImage',
      acceptedFiles: 'image/*',
      headers: {'x-access-token': this.token}
    };
  }

  ngOnInit() {
    this.dataService.getAllCategories().subscribe((res) => {
      this.categories = res['data'];
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });
    if (this.Id) {
      this.dataService.getSubCategoryById(this.Id).subscribe((res) => {
        this.subCatToEdit = res['data'];
        this.image = this.subCatToEdit['img'];
      }, (err) => {
        if (err.status === 0) {
          this.toastr.error('Server is Down.');
        } else {
          this.toastr.error(err.error.message || 'Internal Server Error');
        }
      });
      this.editState = true;
    } else {
      this.addState = true;
    }
  }

  onImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
  }

  onRemoved(event) {
    if (!event) {
      this.image = '';
    }
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onCreate() {
    if (this.groupForm.invalid) {
      return;
    }
    let subCat = {
      img: this.image,
      name: this.groupForm.controls['name'].value,
      mainCategory: this.groupForm.controls['mainCategory'].value,
      addedBy: this.currentUser
    };

    this.dataService.saveSubCategory(subCat).subscribe((res) => {
      this.router.navigate(['../'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });
  }

  onUpdate() {
    if (this.groupForm.invalid) {
      return;
    }
    let subCat = {
      img: this.image,
      name: this.groupForm.controls['subCatToEdit.name'].value,
      mainCategory: this.groupForm.controls['subCatToEdit.mainCategory'].value,
      addedBy: this.currentUser
    };

    this.dataService.updateSubCategory(this.subCatToEdit['_id'], subCat).subscribe((res) => {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });
  }
}
