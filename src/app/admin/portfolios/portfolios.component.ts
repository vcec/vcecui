import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/dataService.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Config} from "../../services/config.service";
import {main} from "@angular/compiler-cli/src/main";

declare var $: any;

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})

export class PortfoliosComponent implements OnInit {
  images: string[] = [];
  videos: string[] = [];
  caseStudies: string[] = [];
  whitePapers: string[] = [];
  @ViewChild('f') portfolioForm: NgForm;
  productGroups: any[] = [];
  solutions: any[] = [];
  subSolutions: any[] = [];
  isFeaturedProduct = false;
  featuredProductImage = '';
  portfolios: any[] = [];
  selectedSubSolutions = [];
  addPortfolioState = false;
  editPortfolioState = false;
  portfolioToEdit = {};


  constructor(private dataService: DataService, private router: Router, private config: Config) {

  }

  imageUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadImage',
    acceptedFiles: 'image/*'
  };

  videoUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadVideo',
    acceptedFiles: 'video/*'
  };

  pdfUploadConfig = {
    url: this.config.serverUrl + 'upload/uploadPdf',
    acceptedFiles: 'application/pdf'
  };


  ngOnInit() {

    this.dataService.getAllPortFolios().subscribe((response) => {
      if (response['count'] > 0) {
        this.portfolios = response['data'];
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });

    // get all product groups
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
          return {'name': v.category_name, 'checked': false, '_id': v._id};
        });
      }
    }, (error) => {
      if (error.status === 0) {
        console.log('*****Server is down*****');
      }
    });


    this.dataService.getAllSubcategories().subscribe((response) => {
      if (response['count'] > 0) {
        this.subSolutions = response['data'].map((v, i) => {
          return {'name': v.name, 'checked': false, 'mainCategory': v.mainCategory};
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
    if (event[1].data.urlPath) {
      this.featuredProductImage = this.config.serverUrl + event[1].data.urlPath;
    }
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
    if (event[1].data.urlPath) {
      this.images.push(this.config.serverUrl + event[1].data.urlPath);
    }
  }

  onVideoUploadError() {

  }

  onVideoUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.videos.push(this.config.serverUrl + event[1].data.urlPath);
    }
  }

  onPdf1UploadError() {

  }

  onPdf1UploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.caseStudies.push(this.config.serverUrl + event[1].data.urlPath);
    }
  }

  onPdf2UploadError() {

  }

  onPdf2UploadSuccess(event) {
    if (event[1].status === 200) {
      this.whitePapers.push(this.config.serverUrl + event[1].data.urlPath + event[0].name);
    }
  }

  changeSubCatSelection(name) {
    if (this.selectedSubSolutions.indexOf(name) == -1) {
      this.selectedSubSolutions.push(name);
    }
  }

  checkIsItSelected(name) {
    if (this.selectedSubSolutions.indexOf(name) == -1) {
      return false;
    }
    return true;
  }

  editPortfolio(portfolio) {
    this.addPortfolioState = false;
    this.editPortfolioState = true;
    this.portfolioToEdit = $.extend({}, portfolio);
    var self = this;

    self.productGroups.forEach(function (v, i) {
      if (self.portfolioToEdit['productGroups'].indexOf(v.name) != -1) {
        v.checked = true;
      }
    });

    self.solutions.forEach(function (v, i) {
      if (self.portfolioToEdit['solutions'].indexOf(v.name) != -1) {
        v.checked = true;
      }
    });

    self.subSolutions.forEach(function (v, i) {
      if (self.portfolioToEdit['subSolutions'].indexOf(v.name) != -1) {
        self.changeSubCatSelection(v.name);
      }
    });

    this.isFeaturedProduct = this.portfolioToEdit['isItFeaturedProduct'];
  }

  removeImageFromBannerImages(image) {
    var index = this.portfolioToEdit['images'].indexOf(image);
    this.portfolioToEdit['images'].splice(index, 1);
  }

  removeVideoFromVideos(video) {
    var index = this.portfolioToEdit['videos'].indexOf(video);
    this.portfolioToEdit['videos'].splice(index, 1);
  }

  removeCaseStudyFromCaseStudies(name) {
    var index = this.portfolioToEdit['caseStudies'].indexOf(name);
    this.portfolioToEdit['caseStudies'].splice(index, 1);
  }

  removeWhitePaperFromList(name) {
    var index = this.portfolioToEdit['whitePapers'].indexOf(name);
    this.portfolioToEdit['whitePapers'].splice(index, 1);
  }

  removeFeaturedImage() {
    this.portfolioToEdit['imgIfFeaturedProduct'] = "";
  }

  onUpdate() {

  }

  deletePortfolio(portfolio) {
    this.dataService.deletePortFolio(portfolio._id).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
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
      subSolutions: this.selectedSubSolutions,
      isItFeaturedProduct: this.isFeaturedProduct,
      imgIfFeaturedProduct: this.featuredProductImage,
      images: this.images,
      videos: this.videos,
      caseStudies: this.caseStudies,
      whitePapers: this.whitePapers
    });

    //save portfolio data
    this.dataService.savePortFolio(obj).subscribe((result) => {
      console.log(result);
    });
  }
}
