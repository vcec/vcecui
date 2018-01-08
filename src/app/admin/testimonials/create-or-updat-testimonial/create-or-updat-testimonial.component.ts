import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DialogService} from "ng2-bootstrap-modal";
import {Config} from "../../../services/config.service";
import {ToastsManager} from "ng2-toastr";
import {DataService} from "../../../services/dataService.service";
import {ActivatedRoute, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-create-or-updat-testimonial',
  templateUrl: './create-or-updat-testimonial.component.html',
  styleUrls: ['./create-or-updat-testimonial.component.scss']
})
export class CreateOrUpdatTestimonialComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  addTestimonialState = false;
  editTestimonialState = false;
  testimonialToEdit = {
    userInfo: {}
  };
  Id: string;
  image: "";

  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.Id) {
      this.editTestimonialState = true;
      this.dataService.getTestimonialById(this.Id).subscribe((res) => {
        this.testimonialToEdit = res['data'];
      }, (err) => {
      })
    } else {
      this.addTestimonialState = true;
    }
  }


  onImageUploadError(event) {
    console.log(event);
  }

  onRemoved(event) {
    console.log(event);
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onUpdate() {
    let testimonial = {
      userInfo: {
        userName: this.groupForm.controls['testimonialToEdit.userInfo.userName'].value,
        userCompany: this.groupForm.controls['testimonialToEdit.userInfo.userCompany'].value,
        userImg: this.image
      },
      mainText: this.groupForm.controls['testimonialToEdit.mainText'].value
    }
    this.dataService.updateTestimonial(this.testimonialToEdit['_id'], testimonial).subscribe((res) => {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }, (err) => {
      console.log(err);
    });
  }

  onCreate() {
    let testimonial = {
      userInfo: {
        userName: this.groupForm.value.userName,
        userCompany: this.groupForm.value.userCompany,
        userImg: this.image
      },
      mainText: this.groupForm.value.mainText
    };
    this.dataService.saveTestimonial(testimonial).subscribe((res) => {
      this.router.navigate(['../'], {relativeTo: this.route});
    }, (err) => {
      console.log(err);
    });
  }
}
