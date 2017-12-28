import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/dataService.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  backendUrl = 'http://10.120.88.222:3001/';
  groups: any[] = [];

  constructor(private dataService: DataService) {
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

}
