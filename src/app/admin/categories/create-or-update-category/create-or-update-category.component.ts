import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DataService} from "../../../services/dataService.service";
import {NgForm} from "@angular/forms";
import {Config} from "../../../services/config.service";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-create-or-update-category',
  templateUrl: './create-or-update-category.component.html',
  styles: [`
    .editGroup .dz-preview {
      display: none !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrUpdateCategoryComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  private Id: string;
  addCatState = false;
  editCatState = false;
  catToEdit = {};
  image: "";

  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,
              private config: Config, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.Id) {
      this.editCatState = true;
      this.dataService.getCategoryById(this.Id).subscribe((res) => {
        this.catToEdit = res['data'];
        this.image = this.catToEdit['img'];
      }, (err) => {

      });
    } else {
      this.addCatState = true;
    }
  }

  onImageUploadError(event) {
    console.log(event);
  }

  onRemoved() {
    this.image = "";
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onCreate() {
    let data = $.extend(this.groupForm.value, {img: this.image});
    this.dataService.saveSolution(data).subscribe((res) => {
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
      category_name: this.groupForm.controls['catToEdit.category_name'].value,
      img: this.image
    };

    this.dataService.updateSolutions(this.catToEdit['_id'], data).subscribe((res) => {
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
