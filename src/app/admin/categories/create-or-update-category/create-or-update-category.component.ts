import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../../services/dataService.service';
import {NgForm} from '@angular/forms';
import {Config} from '../../../services/config.service';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';

declare var $: any;

@Component({
  selector: 'app-create-or-update-category',
  templateUrl: './create-or-update-category.component.html',
  styleUrls: ['./create-or-update-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrUpdateCategoryComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  private Id: string;
  addCatState = false;
  editCatState = false;
  catToEdit = {};
  image: '';
  coverImage = '';
  token = '';
  imageUploadConfig: {};
  currentUser = '';
  alternativeImage = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,
              private config: Config, public toastr: ToastsManager, vcr: ViewContainerRef, private cookieService: CookieService) {
    this.token = this.cookieService.get('accessToken');
    this.currentUser = this.cookieService.get('userId');
    this.route.params.subscribe(params => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);
    this.imageUploadConfig = {
      url: this.config.serverUrl + 'upload/uploadImage',
      acceptedFiles: 'image/*',
      headers: {'x-access-token': this.token},
    };
  }

  ngOnInit() {
    if (this.Id) {
      this.editCatState = true;
      this.dataService.getCategoryById(this.Id).subscribe((res) => {
        this.catToEdit = res['data'];
        this.image = this.catToEdit['img'];
        this.coverImage = this.catToEdit['coverImage'];
        this.alternativeImage = this.catToEdit['alternativeImage'];
      }, (err) => {
        this.toastr.error(err.error.message || err.error.error || 'Internal Server Error');
      });
    } else {
      this.addCatState = true;
    }
  }

  onImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.image = '';
  }

  onRemoved() {
    this.image = '';
  }

  onCoverImageRemoved() {
    this.coverImage = '';
  }

  onAltrImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.alternativeImage = '';
  }

  onAltrImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.alternativeImage = event[1].data.urlPath;
    }
  }

  onAltrImageRemoved() {
    this.alternativeImage = '';
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onCoverImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.coverImage = event[1].data.urlPath;
    }
  }

  onCoverImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.coverImage = '';
  }

  onCreate() {
    if (this.groupForm.invalid || !this.image || !this.coverImage || !this.alternativeImage) {
      return false;
    }

    let data = $.extend(this.groupForm.value, {
      img: this.image,
      coverImage: this.coverImage,
      addedBy: this.currentUser,
      alternativeImage: this.alternativeImage
    });

    this.dataService.saveSolution(data).subscribe((res) => {
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
    if (this.groupForm.invalid || !this.image || !this.coverImage || !this.alternativeImage) {
      return false;
    }
    let data = {
      category_name: this.groupForm.controls['catToEdit.category_name'].value,
      desc: this.groupForm.controls['catToEdit.desc'].value,
      img: this.image,
      coverImage: this.coverImage,
      addedBy: this.currentUser,
      alternativeImage: this.alternativeImage,
      shortDesc: this.groupForm.controls['shortDesc'].value,
      heading: this.groupForm.controls['heading'].value
    };

    this.dataService.updateSolutions(this.catToEdit['_id'], data).subscribe((res) => {
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
