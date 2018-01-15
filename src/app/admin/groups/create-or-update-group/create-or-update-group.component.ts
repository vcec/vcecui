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
  styles: [`
    .dz-preview {
      display: none !important;
    }
  `],
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
  imageUploadConfig = {};
  token = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,
              private config: Config, public toastr: ToastsManager, vcr: ViewContainerRef, private cookieService: CookieService) {
    this.token = this.cookieService.get('accessToken');
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
    let data = $.extend(this.groupForm.value, {img: this.image, coverImage: this.coverImage});
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
    let data = {
      group_name: this.groupForm.controls['groupToEdit.group_name'].value,
      desc: this.groupForm.controls['groupToEdit.desc'].value,
      img: this.image,
      coverImage: this.coverImage
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
