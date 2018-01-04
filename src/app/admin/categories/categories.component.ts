import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/dataService.service";
import {NgForm} from "@angular/forms";
import {Config} from "../../services/config.service";

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  @ViewChild('f') groupForm: NgForm;
  addCatState = false;
  editCatState = false;
  catToEdit = {};
  newCat = {};
  image: "";


  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private dataService: DataService, private config: Config) {

  }

  ngOnInit() {
    this.dataService.getAllCategories().subscribe((res) => {
      if (res['count'] > 0) {
        this.categories = res['data'];
        console.log(this.categories);
      }
    }, (err) => {
      if (err.status === 0) {
        console.log('*****Server is down*****');
      } else {
        console.log(err);
      }
    })
  }

  onRemoved(event) {
    console.log(event);
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onImageUploadError(event) {
    console.log(event);
  }

  onUpdate() {
    let data = $.extend(this.groupForm.value, {img: this.image});
    this.dataService.updateSolutions(this.catToEdit['_id'], data).subscribe((res) => {
      console.log(res);
      this.image = "";
      this.catToEdit = {};
      this.editCatState = false;
    }, (err) => {
      console.log(err);
    });
  }

  editCat(group) {
    this.addCatState = false;
    this.catToEdit = this.categories.filter(function (v, i) {
      return v.categoryId === group.categoryId ? true : false;
    });
    this.catToEdit = $.extend(this.catToEdit[0]);
    this.image = this.catToEdit['img'];
    this.editCatState = true;
  }

  onCreate() {
    let data = $.extend(this.groupForm.value, {img: this.image});
    this.dataService.saveSolution(data).subscribe((res) => {
      console.log(res);
      this.image = "";
      this.newCat = {};
      this.addCatState = false;
    }, (err) => {
      console.log(err);
    });
  }

  deleteCat(group) {
    console.log(group['_id']);
    this.dataService.deleteSolution(group['_id']).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

}
