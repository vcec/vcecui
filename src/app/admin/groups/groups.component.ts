import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {NgForm} from "@angular/forms";
import {Config} from "../../services/config.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmComponent} from "../confirmComponent/confirm.component";


declare var $: any;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styles: [`
    .editGroup .dz-preview {
      display: none !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})

export class GroupsComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  addGroupState = false;
  editGroupState = false;
  groupToEdit = {};
  newGroup = {};
  groups: any[] = [];
  image: string = '';
  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private dataService: DataService, private config: Config,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllGroups();
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

  getAllGroups() {
    this.dataService.getAllGroups().subscribe((response) => {
        if (response['count'] > 0) {
          this.groups = response['data'];
        }
      }, (err) => {
        if (err.status === 0) {
          this.toastr.error("Server is Down.")
        } else {
          this.toastr.error(err.message);
        }
      }
    );
  }

  onUpdate() {
    let data = {
      group_name: this.groupForm.controls['groupToEdit.group_name'].value,
      img: this.image
    };

    this.dataService.updateGroup(this.groupToEdit['_id'], data).subscribe((res) => {
      this.toastr.success("Group updated successfully.", null, {toastLife: 3000});
      this.image = "";
      this.groupToEdit = {};
      this.editGroupState = false;
      this.getAllGroups();
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error("Server is Down.")
      } else {
        this.toastr.error(err.message);
      }
    });
  }

  editGroup(group) {
    this.addGroupState = false;
    this.resetForm();
    this.groupToEdit = this.groups.filter(function (v, i) {
      return v.productGroupId === group.productGroupId ? true : false;
    });
    this.groupToEdit = $.extend(this.groupToEdit[0]);
    this.image = this.groupToEdit['img'];
    this.editGroupState = true;
  }

  onCreate() {
    let data = $.extend(this.groupForm.value, {img: this.image});
    this.dataService.saveGroup(data).subscribe((res) => {
      this.toastr.success("Group created successfully.", null, {toastLife: 3000});
      this.image = "";
      this.newGroup = {};
      this.addGroupState = false;
      this.getAllGroups();
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error("Server is Down.")
      } else {
        this.toastr.error(err.message);
      }
    });
  }

  deleteGroup(group) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this group?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deleteGroup(group['_id']).subscribe((res) => {
          this.toastr.success("Group deleted successfully.", null, {toastLife: 3000});
          this.getAllGroups();
        }, (err) => {
          if (err.status === 0) {
            this.toastr.error("Server is Down.")
          } else {
            this.toastr.error(err.message);
          }
        });
      }
    });
  }

  resetForm() {
    this.image = "";
  }
}
