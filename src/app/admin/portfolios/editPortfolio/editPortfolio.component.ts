import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Config} from "../../../services/config.service";
import {DataService} from "../../../services/dataService.service";

declare var $: any;

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './editPortfolio.component.html'
})

export class EditPortfolioComponent implements OnInit {
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

  }
}
