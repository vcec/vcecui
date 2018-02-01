import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Config} from '../../services/config.service';
import {main} from '@angular/compiler-cli/src/main';
import {ToastsManager} from 'ng2-toastr';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../confirmComponent/confirm.component';

declare var $: any;

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})

export class PortfoliosComponent implements OnInit {
  portfolios = [];
  totalPortfolios: number = 0;
  currentPageIndex: number;

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.currentPageIndex = +params['page'];
      this.getAllPortfolios();
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  getAllPortfolios() {
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    this.currentPageIndex = +this.currentPageIndex;
    this.dataService.getAllPortFolios(this.currentPageIndex).subscribe((response) => {
      if (response['count'] > 0) {
        this.portfolios = response['data'];
        this.totalPortfolios = response['totalRecords'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });
  }

  ngOnInit() {
    this.getAllPortfolios();
  }

  editPortfolio(portfolio) {
    this.router.navigate(['update/' + portfolio._id], {relativeTo: this.route});
  }

  createPortfolio(portfolio) {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  deletePortfolio(portfolio) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this portfolio?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deletePortFolio(portfolio._id).subscribe((res) => {
          this.toastr.success('Portfolio deleted successfully.', null, {toastLife: 3000});
          this.getAllPortfolios();
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
