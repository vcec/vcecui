import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {NgForm} from "@angular/forms";
import {Config} from "../../services/config.service";

declare var $: any;


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  @ViewChild('f') groupForm: NgForm;
  addGroupState = false;
  editGroupState = false;
  groupToEdit = {};
  newGroup = {};
  groups: any[] = [];
  image: "";
  hoverImage: "";

  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  constructor(private dataService: DataService, private config: Config) {
  }

  ngOnInit() {
    this.dataService.getAllGroups().subscribe((response) => {
      if (response['count'] > 0) {
        this.groups = response['data'];
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

  onHoverImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.hoverImage = event[1].data.urlPath;
    }
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.image = event[1].data.urlPath;
    }
  }

  onUpdate() {
    let data = $.extend(this.groupForm.value, {img: this.image, hoverImg: this.hoverImage});
    this.dataService.updateGroup(this.groupToEdit['_id'], data).subscribe((res) => {
      console.log(res);
      this.hoverImage = "";
      this.image = "";
      this.groupToEdit = "";
      this.editGroupState = false;
    }, (err) => {
      console.log(err);
    });
  }

  editGroup(group) {
    this.addGroupState = false;
    this.groupToEdit = this.groups.filter(function (v, i) {
      return v.productGroupId === group.productGroupId ? true : false;
    });
    this.groupToEdit = $.extend(this.groupToEdit[0]);
    this.image = this.groupToEdit['img'];
    this.hoverImage = this.groupToEdit['hoverImg'];
    this.editGroupState = true;
  }

  onCreate() {
    let data = $.extend(this.groupForm.value, {img: this.image, hoverImg: this.hoverImage});
    this.dataService.saveGroup(data).subscribe((res) => {
      console.log(res);
      this.hoverImage = "";
      this.image = "";
      this.newGroup = "";
      this.addGroupState = false;
    }, (err) => {
      console.log(err);
    });
  }

  deleteGroup(group) {
    console.log(group['_id']);
    this.dataService.deleteGroup(group['_id']).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }


}
