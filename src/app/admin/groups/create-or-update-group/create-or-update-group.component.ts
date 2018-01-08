import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Router, Route, ActivatedRoute} from "@angular/router";
import {DataService} from "../../../services/dataService.service";
import {Config} from "../../../services/config.service";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {NgForm} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-create-or-update-group',
  templateUrl: './create-or-update-group.component.html',
  styles: [`
    .editGroup .dz-preview {
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
      this.editGroupState = true;
      this.dataService.getGroupById(this.Id).subscribe((res) => {
        this.groupToEdit = res['data'];
        this.image = this.groupToEdit['img'];
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

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onCreate() {
    let data = $.extend(this.groupForm.value, {img: this.image});
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
      img: this.image
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
