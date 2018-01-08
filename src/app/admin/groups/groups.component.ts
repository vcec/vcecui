import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {Config} from "../../services/config.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {DialogService} from "ng2-bootstrap-modal";
import {Router, Route, ActivatedRoute} from "@angular/router";
import {ConfirmComponent} from "../confirmComponent/confirm.component";

declare var $: any;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})

export class GroupsComponent implements OnInit {
  groups: any[] = [];

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllGroups();
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


  addGroup() {
    this.router.navigate(['./create'], {relativeTo: this.route});
  }


  editGroup(group) {
    this.router.navigate(['./update', group._id], {relativeTo: this.route});
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
}
