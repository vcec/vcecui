import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Config} from "../../services/config.service";
import {DataService} from "../../services/dataService.service";

declare var $: any;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  addTestimonialState = false;
  editTestimonialState = false;
  testimonialToEdit = {};
  testimonials: any[] = [];
  image: "";

  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private dataService: DataService, private config: Config) {
  }


  ngOnInit() {
    this.dataService.getAllTestimonials().subscribe((response) => {
      if (response['count'] > 0) {
        this.testimonials = response['data'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });
  }

  onHoverImageUploadError(event) {
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
    console.log(this.groupForm);
    let testimonial = {
      userInfo: {
        userName: this.groupForm.controls['testimonialToEdit.userInfo.userName'].value,
        userCompany: this.groupForm.controls['testimonialToEdit.userInfo.userCompany'].value,
        userImg: this.image
      },
      mainText: this.groupForm.controls['testimonialToEdit.mainText'].value
    }
    this.dataService.updateTestimonial(this.testimonialToEdit['_id'], testimonial).subscribe((res) => {
      console.log(res);
      this.image = "";
      this.testimonialToEdit = "";
      this.editTestimonialState = false;
    }, (err) => {
      console.log(err);
    });
  }

  editTestimonial(group) {
    this.addTestimonialState = false;
    this.testimonialToEdit = this.testimonials.filter(function (v, i) {
      return v.testimonialId === group.testimonialId ? true : false;
    });
    this.testimonialToEdit = $.extend(this.testimonialToEdit[0]);
    this.image = this.testimonialToEdit['img'];
    console.log(this.testimonialToEdit);
    this.editTestimonialState = true;
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
      console.log(res);
      this.image = "";
      this.addTestimonialState = false;
    }, (err) => {
      console.log(err);
    });
  }

  deleteTestimonial(group) {
    this.dataService.deleteTestimonial(group['_id']).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
