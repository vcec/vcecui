import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  serverUrl = 'http://localhost:3001/';
  images: string[] = [];
  videos: string[] = [];
  caseStudies: string[] = [];
  whitePapers: string[] = [];
  @ViewChild('f') portfolioForm: NgForm;
  productGroups: any[] = [];
  solutions: any[] = [];
  isFeaturedProduct = false;
  featuredProductImage = '';


  constructor(private dataService: DataService, private router: Router) {

  }


  imageUploadConfig = {
    url: this.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  videoUploadConfig = {
    url: this.serverUrl + 'upload/uploadVideo',
    acceptedFiles: 'video/*'
  };

  pdfUploadConfig = {
    url: this.serverUrl + 'upload/uploadPdf',
    acceptedFiles: 'application/pdf'
  };


  ngOnInit() {
    // get all product groupsø
    this.dataService.getAllGroups().subscribe((response) => {
      if (response['count'] > 0) {
        this.productGroups = response['data'].map((v, i) => {
          return {'name': v.group_name, 'checked': false};
        });
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });

    this.dataService.getAllCategories().subscribe((response) => {
      if (response['count'] > 0) {
        this.solutions = response['data'].map((v, i) => {
          return {'name': v.category_name, 'checked': false};
        });
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });
  }

  onFeatureImageUploadError(event) {

  }

  onFeatureImageUploadSuccess(event) {
    this.featuredProductImage = this.serverUrl + event[1].data.urlPath;
  }

  onImageUploadError(event) {
    console.log(event);
  }

  onRemoved(event) {
    /* for (let i = 0; i < this.images.length; i++) {
     }*/
    console.log(event);
  }

  onImageUploadSuccess(event) {
    if (event[1].status === 200) {
      this.images.push(this.serverUrl + event[1].data.urlPath);
    }
  }

  onVideoUploadError() {

  }

  onVideoUploadSuccess(event) {
    if (event[1].status === 200) {
      this.videos.push(this.serverUrl + event[1].data.urlPath);
    }
  }

  onPdf1UploadError() {

  }

  onPdf1UploadSuccess(event) {
    if (event[1].status === 200) {
      this.caseStudies.push(this.serverUrl + event[1].data.urlPath);
    }
  }

  onPdf2UploadError() {

  }

  onPdf2UploadSuccess(event) {
    if (event[1].status === 200) {
      this.whitePapers.push(this.serverUrl + event[1].data.urlPath + event[0].name);
    }
  }

  onSubmit() {
    let selectedSolutions = [];
    this.solutions.forEach((v, i) => {
      v.checked ? selectedSolutions.push(v.name) : '';
    });

    let selectedGroups = [];
    this.productGroups.forEach((v, i) => {
      v.checked ? selectedGroups.push(v.name) : '';
    });

    let obj = $.extend(this.portfolioForm.value, {
      productGroups: selectedGroups,
      solutions: selectedSolutions,
      isItFeaturedProduct: this.isFeaturedProduct,
      imgIfFeaturedProduct: this.featuredProductImage,
      images: this.images,
      videos: this.videos,
      caseStudies: this.caseStudies,
      whitePapers: this.whitePapers
    });

    console.log(obj);

    /* this.dataService.savePortFolio(obj).subscribe((result) => {
       console.log(result);
     });*/
  }
}
