import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Config} from "./config.service";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class DataService {

  uploaderObj = {};
  accessToken = '';

  constructor(private httpClient: HttpClient, private config: Config, private cookieService: CookieService) {
    this.accessToken = this.cookieService.get('accessToken');
  }

  setAccessToekn(token) {
    this.accessToken = token;
  }

  setUploaderObj(val) {
    this.uploaderObj = val;
  }

  getUploderObj() {
    return this.uploaderObj;
  }

  //login
  login(data) {
    return this.httpClient.post(this.config.serverUrl + 'api/auth/login', data);
  }

  // create portfolio
  savePortFolio(data) {
    return this.httpClient.post(this.config.serverUrl + 'portfolio', data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // update portfolio
  updatePortFolio(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'portfolio/' + id, data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // get all portfolios
  getAllPortFolios() {
    return this.httpClient.get(this.config.serverUrl + 'portfolio');
  }

  // get portfolio by id
  getPortFolio(id) {
    return this.httpClient.get(this.config.serverUrl + 'portfolio/' + id);
  }

  // delete portfolio
  deletePortFolio(id) {
    return this.httpClient.delete(this.config.serverUrl + 'portfolio/' + id, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // get all groups
  getAllGroups() {
    return this.httpClient.get(this.config.serverUrl + 'group');
  }

  // update group
  updateGroup(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'group/' + id, data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // create group
  saveGroup(data) {
    return this.httpClient.post(this.config.serverUrl + 'group', data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // delete group
  deleteGroup(id) {
    return this.httpClient.delete(this.config.serverUrl + 'group/' + id, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  //get group by id
  getGroupById(id) {
    return this.httpClient.get(this.config.serverUrl + 'group/' + id);
  }

  // get all solutions/category
  getAllCategories() {
    return this.httpClient.get(this.config.serverUrl + 'category');
  }

  getCategoryById(id) {
    return this.httpClient.get(this.config.serverUrl + 'category/' + id);
  }

  // create category(solution)
  saveSolution(data) {
    return this.httpClient.post(this.config.serverUrl + 'category', data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // update solution
  updateSolutions(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'category/' + id, data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  // delete solution
  deleteSolution(id) {
    return this.httpClient.delete(this.config.serverUrl + 'category/' + id, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  getAllTestimonials() {
    return this.httpClient.get(this.config.serverUrl + 'testimonial');
  }

  getTestimonialById(id) {
    return this.httpClient.get(this.config.serverUrl + 'testimonial/' + id);
  }

  deleteTestimonial(id) {
    return this.httpClient.delete(this.config.serverUrl + 'testimonial/' + id, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  saveTestimonial(data) {
    return this.httpClient.post(this.config.serverUrl + 'testimonial', data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  updateTestimonial(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'testimonial/' + id, data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  getSubcategoriesOfMainCat(mainCatId) {
    return this.httpClient.get(this.config.serverUrl + 'categories/mainCategory/' + mainCatId);
  }

  getAllSubcategories() {
    return this.httpClient.get(this.config.serverUrl + 'subCategory');
  }

  getSubCategoryById(id) {
    return this.httpClient.get(this.config.serverUrl + 'subCategory/' + id);
  }

  saveSubCategory(data) {
    return this.httpClient.post(this.config.serverUrl + 'subCategory', data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  updateSubCategory(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'subCategory/' + id, data, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  deleteSubCategory(id) {
    return this.httpClient.delete(this.config.serverUrl + 'subCategory/' + id, {
      headers: {'x-access-token': this.accessToken}
    });
  }

  getAllProductsByGroupName(groupName) {
    return this.httpClient.get(this.config.serverUrl + 'portfolio/group/' + groupName);
  }

  getProductGroupByGroupName(groupName) {
    return this.httpClient.get(this.config.serverUrl + "group/groupName/" + groupName);
  }

  getAllProductsByCategoryName(catName) {
    return this.httpClient.get(this.config.serverUrl + "portfolio/category/" + catName);
  }

  getCatDetailsByCatName(catName) {
    return this.httpClient.get(this.config.serverUrl + "category/categoryName/" + catName);
  }
}

