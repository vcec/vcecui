import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Config} from '../../services/config.service';
import {DataService} from '../../services/dataService.service';
import {DialogService} from 'ng2-bootstrap-modal';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmComponent} from '../confirmComponent/confirm.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  totalRecords: number = 0;
  currentPageIndex: number;


  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.currentPageIndex = +params['page'];
      this.getAllTestimonials();
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllTestimonials();
  }

  getAllTestimonials() {
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    this.currentPageIndex = +this.currentPageIndex;
    this.dataService.getAllTestimonials(this.currentPageIndex).subscribe((response) => {
      if (response['count'] > 0) {
        this.testimonials = response['data'];
        this.totalRecords = response['totalRecords'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });
  }

  addTestimonial() {
    this.router.navigate(['/admin/testimonials/create']);
  }

  editTestimonial(testimonial) {
    this.router.navigate(['/admin/testimonials/update/', testimonial._id]);
  }

  deleteTestimonial(testimonial) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      message: 'Are you sure to delete this testimonial?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dataService.deleteTestimonial(testimonial['_id']).subscribe((res) => {
          this.toastr.success('Testimonial deleted successfully.', null, {toastLife: 3000});
          this.getAllTestimonials();
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
