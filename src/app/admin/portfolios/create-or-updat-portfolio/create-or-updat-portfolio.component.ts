import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/dataService.service';
import {ToastsManager} from 'ng2-toastr';
import {DialogService} from 'ng2-bootstrap-modal';
import {Config} from '../../../services/config.service';
import {NgForm} from '@angular/forms';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {DomSanitizer} from '@angular/platform-browser';

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
  coverImage?: string;
}

@Component({
  selector: 'app-create-or-updat-portfolio',
  templateUrl: './create-or-updat-portfolio.component.html',
  styleUrls: ['./create-or-updat-portfolio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrUpdatPortfolioComponent implements OnInit {
  coverImage: CommonObjForUploader;
  mainVideo: VideoObj;
  editStateId: number = -1;
  patternForYouTubeUrl = '(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^"&?\\/ ]{11}.*)';
  lastUpload: string;
  youTubeVideoUrl: string;
  videos: VideoObj[] = [];
  videoCoverImage: string;
  videoType = '';
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

  uploadFormTitle = '';
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
  setDataFormHeading = '';
  setDataFormDesc = '';
  setDataSeeMoreLink = '';
  articles: CommonObjForData[] = [];
  other: CommonObjForData[] = [];
  demos: CommonObjForData[] = [];
  token = '';
  currentUser = '';

  imageUploadConfig = {};

  videoUploadConfig = {};

  pdfUploadConfig = {};

  constructor(private dataService: DataService, private config: Config, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer,
              public toastr: ToastsManager, vcr: ViewContainerRef, private dialogService: DialogService, private cookieService: CookieService) {
    this.token = this.cookieService.get('accessToken');
    this.currentUser = this.cookieService.get('userId');
    this.route.params.subscribe((params) => {
      this.Id = params['id'];
    });
    this.toastr.setRootViewContainerRef(vcr);

    this.imageUploadConfig = {
      url: this.config.serverUrl + 'upload/uploadImage',
      acceptedFiles: 'image/*',
      headers: {'x-access-token': this.token}
    };

    this.videoUploadConfig = {
      url: this.config.serverUrl + 'upload/uploadVideo',
      acceptedFiles: 'video/*',
      headers: {'x-access-token': this.token}
    };

    this.pdfUploadConfig = {
      url: this.config.serverUrl + 'upload/uploadPdf',
      acceptedFiles: 'application/pdf',
      headers: {'x-access-token': this.token}
    };

  }

  ngOnInit() {
    // get all product groups
    this.dataService.getAllGroups().subscribe((response) => {
      if (response['count'] > 0) {
        this.productGroups = response['data'].map((v, i) => {
          return {'name': v.group_name, 'checked': false};
        });
      }
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });

    // get all categories
    this.dataService.getAllCategories().subscribe((response) => {
      if (response['count'] > 0) {
        this.solutions = response['data'].map((v, i) => {
          return {'name': v.category_name, 'checked': false, '_id': v._id};
        });
      }
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });

    //get all subcategories
    this.dataService.getAllSubcategories().subscribe((response) => {
      if (response['count'] > 0) {
        this.subSolutions = response['data'].map((v, i) => {
          return {'name': v.name, 'checked': false, 'mainCategory': v.mainCategory};
        });
      }
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });

    if (this.Id) {
      this.dataService.getPortFolio(this.Id).subscribe((res) => {

        this.portfolioToEdit = res['data'];
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

        }, 200);

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
        if (err.status === 0) {
          this.toastr.error('Server is Down.');
        } else {
          this.toastr.error(err.error.message || 'Internal Server Error');
        }
      });
    } else {
      this.addPortfolioState = true;
    }
  }

  invalidVideo() {
    if (this.youTubeVideoUrl && this.youTubeVideoUrl.match(this.patternForYouTubeUrl) == null) {
      return true;
    }
    return false;
  }


  sanitizeUrl(url, type?) {
    if (type === 'youtube') {
      const urlPart = url.split('v=')[1];
      let video_id = urlPart !== undefined ? urlPart : url.split('youtu.be/')[1];
      video_id = video_id.split('&')[0];
      const newUrl = 'http://www.youtube.com/embed/' + video_id;
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${newUrl}`);
    } else if (type === 'demoUrl') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}`);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.config.serverUrl}${url}`);
    }
  }

  onUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.lastUpload = event[1].data.urlPath;
    }
  }

  onUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.lastUpload = '';
  }

  onFeatureImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.featuredProductImage = '';
  }

  onFeatureImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.featuredProductImage = event[1].data.urlPath;
    }
  }

  onImageUploadError(event) {
    if (event[1].message) {
      this.toastr.error(event[1].message);
    }
    this.videoCoverImage = '';
  }

  onImageUploadSuccess(event) {
    if (event[1].data.urlPath) {
      this.videoCoverImage = event[1].data.urlPath;
    }
  }

  onVideoCoverImageRemoved() {
    this.videoCoverImage = '';
  }

  onRemoved(event) {
    this.lastUpload = '';
  }

  show(formName ?) {
    this.uploadFormTitle = '';
    this.lastUpload = '';
    this.youTubeVideoUrl = '';
    this.videoType = '';
    this.videoCoverImage = '';
    for (let key in this.uploadForms) {
      this.uploadForms[key] = false;
    }
    formName ? this.uploadForms[formName] = true : '';
  }

  handleUpload(name) {
    const obj = {title: this.uploadFormTitle, url: this.lastUpload};
    switch (name) {
      case 'coverImage':
        this.coverImage = obj;
        break;
      case 'mainVideo':
        const video: VideoObj = {
          title: this.uploadFormTitle,
          url: this.lastUpload || this.youTubeVideoUrl,
          coverImage: this.videoCoverImage
        };
        this.mainVideo = video;
        break;
      case 'subVideo':
        const subVideo: VideoObj = {
          title: this.uploadFormTitle,
          url: this.lastUpload || this.youTubeVideoUrl,
          coverImage: this.videoCoverImage
        };
        if (this.editStateId > -1) {
          this.videos.splice(1, this.editStateId);
          this.videos[this.editStateId] = subVideo;
        } else {
          this.videos.push(subVideo);
        }
        break;
      case 'caseStudy':
        if (this.editStateId > -1) {
          this.caseStudies.splice(1, this.editStateId);
          this.caseStudies[this.editStateId] = obj;
        } else {
          this.caseStudies.push(obj);
        }
        break;
      case 'whitePaper':
        if (this.editStateId > -1) {
          this.whitePapers.splice(1, this.editStateId);
          this.whitePapers[this.editStateId] = obj;
        } else {
          this.whitePapers.push(obj);
        }
        break;
    }
    this.editStateId = -1;
    this.show();
  }

  handleDataUpload(sType) {
    const obj = {
      heading: this.setDataFormHeading, img: this.lastUpload, type: sType,
      desc: this.setDataFormDesc, seeMoreLink: this.setDataSeeMoreLink
    };
    switch (sType) {
      case 'article':
        if (this.editStateId > -1) {
          this.articles.splice(1, this.editStateId);
          this.articles[this.editStateId] = obj;
        } else {
          this.articles.push(obj);
        }
        break;
      case 'other':
        if (this.editStateId > -1) {
          this.other.splice(1, this.editStateId);
          this.other[this.editStateId] = obj;
        } else {
          this.other.push(obj);
        }
        break;
      case 'demo':
        if (this.editStateId > -1) {
          this.demos.splice(1, this.editStateId);
          this.demos[this.editStateId] = obj;
        } else {
          this.demos.push(obj);
        }
        break;
    }
    this.editStateId = -1;
    this.showDataForm();
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  showDataForm(name?) {
    this.setDataSeeMoreLink = '';
    this.setDataFormDesc = '';
    this.setDataFormHeading = '';
    this.lastUpload = '';
    this.youTubeVideoUrl = '';

    for (var key in this.setDataForm) {
      this.setDataForm[key] = false;
    }
    name ? this.setDataForm[name] = true : '';
  }

  changeSubCatSelection(name) {
    if (this.selectedSubSolutions.indexOf(name) == -1) {
      this.selectedSubSolutions.push(name);
    }
  }

  changeStatusOfAllSubCat(id) {
    this.subSolutions.forEach((v, i) => {
      if (this.selectedSubSolutions.indexOf(v.name) != -1 && v.mainCategory == id) {
        this.selectedSubSolutions.splice(this.selectedSubSolutions.indexOf(v.name), 1);
      }
    });
  }


  checkIsItSelected(name) {
    if (this.selectedSubSolutions.indexOf(name) == -1) {
      return false;
    }
    return true;
  }

  removeVideoFromVideos(index) {
    if (index > -1) {
      this.videos.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeOtherFromList(index) {
    if (index > 0) {
      this.other.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeArticleFromList(index) {
    if (index > 0) {
      this.articles.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeCaseStudyFromCaseStudies(index) {
    if (index > 0) {
      this.caseStudies.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeWhitePaperFromList(index) {
    if (index > 0) {
      this.whitePapers.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeDemoFromList(index) {
    if (index > 0) {
      this.demos.splice(index, 1);
    }
    this.show();
    this.showDataForm();
  }

  removeCoverImage() {
    this.coverImage = null;
  }

  removeMainVideo() {
    this.mainVideo = null;
  }

  removeFeaturedImage() {
    this.featuredProductImage = '';
  }

  onUpdate() {
    if (this.portfolioForm.invalid || !this.coverImage || !this.mainVideo ||
      (this.isFeaturedProduct && !this.featuredProductImage) || !this.checkIfAnyGroupSelected() || !this.checkIfAnySolutionSelected()) {
      return;
    }
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
      demos: this.demos,
      addedBy: this.currentUser
    });

    this.dataService.updatePortFolio(this.portfolioToEdit['_id'], obj).subscribe((result) => {
      this.toastr.success('Portfolio updated updated.');
      this.router.navigate(['../../'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });
  }

  checkIfAnyGroupSelected() {
    let f = this.productGroups.filter((v, i) => {
      return v.checked == true ? true : false;
    });
    if (f.length == 0) {
      return false;
    }
    return true;
  }

  checkIfAnySolutionSelected() {
    let f = this.solutions.filter((v, i) => {
      return v.checked == true ? true : false;
    });
    if (f.length == 0) {
      return false;
    }
    return true;
  }

  deleteData(name) {
    this.show();
    switch (name) {
      case 'coverImage':
        this.coverImage = null;
        break;
      case 'mainVideo':
        this.mainVideo = null;
        break;
    }
  }

  setDataForEditState(name, formName, extraData?, id?) {
    this.editStateId = id > -1 ? id : -1;
    this.show(formName);
    this.showDataForm(formName);
    switch (name) {
      case 'coverImage':
        this.uploadFormTitle = this.coverImage.title;
        this.lastUpload = this.coverImage.url;
        break;
      case 'mainVideo':
        this.uploadFormTitle = this.mainVideo.title;
        this.lastUpload = this.mainVideo.url;
        this.videoCoverImage = this.mainVideo.coverImage;
        break;
      case 'subVideo':
        this.uploadFormTitle = extraData.title;
        this.lastUpload = extraData.url;
        this.videoCoverImage = extraData.coverImage;
        break;
      case 'caseStudy':
        this.uploadFormTitle = extraData.title;
        this.lastUpload = extraData.url;
        break;
      case 'whitePaper':
        this.uploadFormTitle = extraData.title;
        this.lastUpload = extraData.url;
        break;
      case 'demo':
        this.setDataFormHeading = extraData.heading;
        this.lastUpload = extraData.img;
        this.setDataFormDesc = extraData.desc;
        this.setDataSeeMoreLink = extraData.seeMoreLink;
        break;
      case 'article' :
        this.setDataFormHeading = extraData.heading;
        this.lastUpload = extraData.img;
        this.setDataFormDesc = extraData.desc;
        this.setDataSeeMoreLink = extraData.seeMoreLink;
        break;
      case 'other'  :
        this.setDataFormHeading = extraData.heading;
        this.lastUpload = extraData.img;
        this.setDataFormDesc = extraData.desc;
        this.setDataSeeMoreLink = extraData.seeMoreLink;
        break;
    }
  }

  onSubmit() {
    if (this.portfolioForm.invalid || !this.coverImage || !this.mainVideo ||
      (this.isFeaturedProduct && !this.featuredProductImage) || !this.checkIfAnyGroupSelected() || !this.checkIfAnySolutionSelected()) {
      return;
    }
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
      demos: this.demos,
      addedBy: this.currentUser
    });

    // console.log(obj);

    // save portfolio data
    this.dataService.savePortFolio(obj).subscribe((result) => {
      this.toastr.success('Portfolio successfully created.');
      this.router.navigate(['../'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.toastr.error('Server is Down.');
      } else {
        this.toastr.error(err.error.message || 'Internal Server Error');
      }
    });
  }
}
