import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {Config} from '../../services/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {DialogService} from 'ng2-bootstrap-modal';
import {Router, Route, ActivatedRoute, CanActivate} from '@angular/router';
import {ConfirmComponent} from '../confirmComponent/confirm.component';
import {AuthGuardService} from '../../services/authGuardService';

declare var $: any;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  groups: any[] = [];
  totalRecords: number = 0;
  currentPageIndex: number;


  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.currentPageIndex = +params['page'];
      this.getAllGroups();
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    this.currentPageIndex = +this.currentPageIndex;
    this.dataService.getAllGroups(this.currentPageIndex).subscribe((response) => {
        if (response['count'] > 0) {
          this.groups = response['data'];
          this.totalRecords = response['totalRecords'];
        }
      }, (err) => {
        if (err.status === 0) {
          this.toastr.error('Server is Down.');
        } else {
          this.toastr.error(err.message);
        }
      }
    );
  }


  addGroup() {
    this.router.navigate(['/admin/groups/create']);
  }


  editGroup(group) {
    this.router.navigate(['/admin/groups/update/', group._id]);
  }

  deleteGroup(group) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this group?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deleteGroup(group['_id']).subscribe((res) => {
          this.toastr.success('Group deleted successfully.', null, {toastLife: 3000});
          this.getAllGroups();
        }, (err) => {
          if (err.status === 0) {
            this.toastr.error('Server is Down.');
          } else {
            this.toastr.error(err.message);
          }
        });
      }
    });
  }
}
