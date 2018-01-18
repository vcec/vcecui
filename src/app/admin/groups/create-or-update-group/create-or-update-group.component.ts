import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Router, Route, ActivatedRoute} from "@angular/router";
import {DataService} from "../../../services/dataService.service";
import {Config} from "../../../services/config.service";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {NgForm} from "@angular/forms";
import {CookieService} from "angular2-cookie/services/cookies.service";

declare var $: any;

@Component({
  selector: 'app-create-or-update-group',
  templateUrl: './create-or-update-group.component.html',
  styleUrls: ['./create-or-update-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrUpdateGroupComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  private Id: string;
  editGroupState = false;
  addGroupState = false;
  groupToEdit = {};
  image: string = '';
  coverImage: string = '';
  alternativeImage: string = '';
  imageUploadConfig = {};
  token = '';
  currentUser = '';


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
      this.editGroupState = true;
      this.dataService.getGroupById(this.Id).subscribe((res) => {
        this.groupToEdit = res['data'];
        this.image = this.groupToEdit['img'];
        this.coverImage = this.groupToEdit['coverImage'];
        this.alternativeImage = this.groupToEdit['alternativeImage'];
      }, (err) => {

      });
    } else {
      this.addGroupState = true;
    }
  }


  onImageUploadError(event) {
    console.log(event);
  }

  onRemoved() {
    this.image = "";
  }

  onCoverImageRemoved() {
    this.coverImage = "";
  }

  onAlternativeImageRemoved() {
    this.alternativeImage = "";
  }

  onAlterImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.alternativeImage = event[1].data.urlPath;
    }
  }

  onAlterImageUploadError() {
    this.alternativeImage = "";
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onCoverImageUploadError() {
    this.coverImage = "";
  }

  onCoverImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.coverImage = event[1].data.urlPath;
    }
  }

  onCreate() {
    if (this.groupForm.invalid || !this.image || !this.coverImage) {
      return false;
    }
    let data = $.extend(this.groupForm.value, {
      img: this.image,
      coverImage: this.coverImage,
      addedBy: this.currentUser,
      alternativeImage: this.alternativeImage
    });
    this.dataService.saveGroup(data).subscribe((res) => {
      this.router.navigate(['../'], {relativeTo: this.route})
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error("Server is Down.")
      } else {
        this.toastr.error(err.message);
      }
    });
  }

  onUpdate() {
    if (this.groupForm.invalid || !this.image || !this.coverImage) {
      return false;
    }
    let data = {
      group_name: this.groupForm.controls['groupToEdit.group_name'].value,
      desc: this.groupForm.controls['groupToEdit.desc'].value,
      img: this.image,
      addedBy: this.currentUser,
      coverImage: this.coverImage,
      alternativeImage: this.alternativeImage
    };

    this.dataService.updateGroup(this.groupToEdit['_id'], data).subscribe((res) => {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error("Server is Down.")
      } else {
        this.toastr.error(err.message);
      }
    });
  }

}
