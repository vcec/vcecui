import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../services/dataService.service";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "ng2-bootstrap-modal";
import {Config} from "../../../services/config.service";
import {NgForm} from "@angular/forms";

declare var $: any;

class CommonObjForUploader {
  title?: string;
  url?: string;
}

class CommonObjForData {
  heading?: string;
  img?: string;
  desc?: string;
  type?: string;
}

class VideoObj {
  title?: string;
  url?: string;
  coverImage?: string
}

@Component({
  selector: 'app-create-or-updat-portfolio',
  templateUrl: './create-or-updat-portfolio.component.html',
  styleUrls: ['./create-or-updat-portfolio.component.scss']
})
export class CreateOrUpdatPortfolioComponent implements OnInit {
  coverImage: CommonObjForUploader;
  mainVideo: CommonObjForUploader;
  lastUpload: string;
  videos: VideoObj[] = [];
  videoCoverImage: string;
  caseStudies: CommonObjForUploader[] = [];
  whitePapers: CommonObjForUploader[] = [];
  demoUrls: CommonObjForUploader[] = [];
  uploadForms = {
    showCoverImageForm: false,
    showMainVideoForm: false,
    showOtherVideoForm: false,
    caseStudy: false,
    whitePaper: false
  };
  setDataForm = {
    articleForm: false,
    otherForm: false,
    demoForm: false
  };

  uploadFormTitle = "";
  @ViewChild('f')
  portfolioForm: NgForm;
  productGroups: any[] = [];
  solutions: any[] = [];
  subSolutions: any[] = [];
  isFeaturedProduct = false;
  featuredProductImage = '';
  selectedSubSolutions = [];
  addPortfolioState = false;
  editPortfolioState = false;
  portfolioToEdit = {};
  Id: string;
  setDataFormHeading = "";
  setDataFormDesc = "";
  setDataSeeMoreLink = "";
  articles: CommonObjForData[] = [];
  other: CommonObjForData[] = [];
  demos: CommonObjForData[] = [];


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

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService) {
    this.route.params.subscribe((params) => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.Id) {
      this.dataService.getPortFolio(this.Id).subscribe((res) => {

        this.portfolioToEdit = res['data'];
        //console.log(this.portfolioToEdit);

        setTimeout(() => {
          this.productGroups.forEach((v, i) => {
            if (this.portfolioToEdit['productGroups'].indexOf(v.name) != -1) {
              v.checked = true;
            }
          });
          this.solutions.forEach((v, i) => {
            if (this.portfolioToEdit['solutions'].indexOf(v.name) != -1) {
              v.checked = true;
            }
          });

          this.subSolutions.forEach((v, i) => {
            if (this.portfolioToEdit['subSolutions'].indexOf(v.name) != -1) {
              this.changeSubCatSelection(v.name);
            }
          });
        });

        this.isFeaturedProduct = this.portfolioToEdit['isItFeaturedProduct'];
        this.featuredProductImage = this.portfolioToEdit['imgIfFeaturedProduct'];
        this.videos = this.portfolioToEdit['videos'];
        this.coverImage = this.portfolioToEdit['coverImage'];
        this.mainVideo = this.portfolioToEdit['mainVideo'];
        this.caseStudies = this.portfolioToEdit['caseStudies'];
        this.whitePapers = this.portfolioToEdit['whitePapers'];
        this.demos = this.portfolioToEdit['demos'];
        this.articles = this.portfolioToEdit['articles'];
        this.other = this.portfolioToEdit['others'];
        this.editPortfolioState = true;
      }, (err) => {

      });
    } else {
      this.addPortfolioState = true;
    }

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

    //get all categories
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

    //get all subcategories
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

  onUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.lastUpload = event[1].data.urlPath;
    }
  }

  onUploadError(event) {
    this.lastUpload = "";
  }

  onFeatureImageUploadError(event) {
    this.featuredProductImage = "";
  }

  onFeatureImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.featuredProductImage = event[1].data.urlPath;
    }
  }

  onImageUploadError(event) {
    this.videoCoverImage = "";
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.videoCoverImage = event[1].data.urlPath;
    }
  }

  onVideoCoverImageRemoved() {
    this.videoCoverImage = "";
  }

  onRemoved(event) {
    this.lastUpload = "";
  }

  show(formName ?) {
    this.uploadFormTitle = "";
    this.lastUpload = "";
    for (let key in this.uploadForms) {
      this.uploadForms[key] = false;
    }
    formName ? this.uploadForms[formName] = true : '';
  }

  handleUpload(name) {
    var obj = {title: this.uploadFormTitle, url: this.lastUpload};
    switch (name) {
      case 'coverImage':
        this.coverImage = obj;
        break;
      case 'mainVideo':
        this.mainVideo = obj;
        break;
      case 'subVideo':
        var video: VideoObj = {title: this.uploadFormTitle, url: this.lastUpload, coverImage: this.videoCoverImage};
        this.videos.push(video);
        break;
      case 'caseStudy':
        this.caseStudies.push(obj);
        break;
      case 'whitePaper':
        this.whitePapers.push(obj);
        break;
    }
    this.show();
  }

  handleDataUpload(sType) {
    var obj = {
      heading: this.setDataFormHeading, img: this.lastUpload, type: sType,
      desc: this.setDataFormDesc, seeMoreLink: this.setDataSeeMoreLink
    };
    switch (sType) {
      case 'article':
        this.articles.push(obj);
        break;
      case 'other':
        this.other.push(obj);
        break;
      case 'demo':
        this.demos.push(obj);
        break;
    }
    this.showDataForm();
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  showDataForm(name?) {
    this.setDataSeeMoreLink = "";
    this.setDataFormDesc = "";
    this.setDataFormHeading = "";
    this.lastUpload = "";

    for (var key in this.setDataForm) {
      this.setDataForm[key] = false;
    }
    name ? this.setDataForm[name] = true : ''
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

  }

  removeVideoFromVideos(name) {
    for (let i = 0; i < this.videos.length; i++) {
      if (this.videos[i].title == name) {
        this.videos.splice(i, 1);
      }
    }
  }

  removeOtherFromList(heading) {
    for (let i = 0; i < this.other.length; i++) {
      if (this.other[i].heading == heading) {
        this.other.splice(i, 1);
      }
    }
  }

  removeArticleFromList(heading) {
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].heading == heading) {
        this.articles.splice(i, 1);
      }
    }
  }

  removeCaseStudyFromCaseStudies(name) {
    for (let i = 0; i < this.caseStudies.length; i++) {
      if (this.caseStudies[i].title == name) {
        this.caseStudies.splice(i, 1);
      }
    }
  }

  removeWhitePaperFromList(name) {
    for (let i = 0; i < this.whitePapers.length; i++) {
      if (this.whitePapers[i].title == name) {
        this.whitePapers.splice(i, 1);
      }
    }
  }

  removeDemoFromList(name) {
    for (let i = 0; i < this.demos.length; i++) {
      if (this.demos[i].heading == name) {
        this.demos.splice(i, 1);
      }
    }
  }

  removeCoverImage() {
    this.coverImage = null;
  }

  removeMainVideo() {
    this.mainVideo = null;
  }

  removeFeaturedImage() {
    this.featuredProductImage = "";
  }

  onUpdate() {
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
      coverImage: this.coverImage,
      mainVideo: this.mainVideo,
      videos: this.videos,
      caseStudies: this.caseStudies,
      whitePapers: this.whitePapers,
      articles: this.articles,
      others: this.other,
      demos: this.demos
    });

    this.dataService.updatePortFolio(this.portfolioToEdit['_id'], obj).subscribe((result) => {
      this.toastr.success('Portfolio updated updated.');
      this.router.navigate(['../../'], {relativeTo: this.route});
    }, (err) => {
      this.toastr.error(err.message);
    });
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
      coverImage: this.coverImage,
      mainVideo: this.mainVideo,
      videos: this.videos,
      caseStudies: this.caseStudies,
      whitePapers: this.whitePapers,
      articles: this.articles,
      others: this.other,
      demos: this.demos
    });

    //console.log(obj);

    //save portfolio data
    this.dataService.savePortFolio(obj).subscribe((result) => {
      this.toastr.success('Portfolio successfully created.');
      this.router.navigate(['../'], {relativeTo: this.route});
    }, (err) => {
      this.toastr.error(err.message);
    });
  }
}
