import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Config} from "./config.service";

@Injectable()
export class DataService {

  uploaderObj = {};


  constructor(private httpClient: HttpClient, private config: Config) {

  }

  setUploaderObj(val) {
    this.uploaderObj = val;
  }

  getUploderObj() {
    return this.uploaderObj;
  }

  // create portfolio
  savePortFolio(data) {
    return this.httpClient.post(this.config.serverUrl + 'portfolio', data);
  }

  // update portfolio
  updatePortFolio(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'portfolio/' + id, data);
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
    return this.httpClient.delete(this.config.serverUrl + 'portfolio/' + id);
  }


  // get all groups
  getAllGroups() {
    return this.httpClient.get(this.config.serverUrl + 'group');
  }

  // update group
  updateGroup(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'group/' + id, data);
  }

  // create group
  saveGroup(data) {
    return this.httpClient.post(this.config.serverUrl + 'group', data);
  }

  // delete group
  deleteGroup(id) {
    return this.httpClient.delete(this.config.serverUrl + 'group/' + id);
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
    return this.httpClient.post(this.config.serverUrl + 'category', data);
  }

  // update solution
  updateSolutions(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'category/' + id, data);
  }

  // delete solution
  deleteSolution(id) {
    return this.httpClient.delete(this.config.serverUrl + 'category/' + id);
  }

  getAllTestimonials() {
    return this.httpClient.get(this.config.serverUrl + 'testimonial');
  }

  getTestimonialById(id) {
    return this.httpClient.get(this.config.serverUrl + 'testimonial/' + id);
  }

  deleteTestimonial(id) {
    return this.httpClient.delete(this.config.serverUrl + 'testimonial/' + id);
  }

  saveTestimonial(data) {
    return this.httpClient.post(this.config.serverUrl + 'testimonial', data);
  }

  updateTestimonial(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'testimonial/' + id, data);
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
    return this.httpClient.post(this.config.serverUrl + 'subCategory', data);
  }

  updateSubCategory(id, data) {
    return this.httpClient.patch(this.config.serverUrl + 'subCategory/' + id, data);
  }

  deleteSubCategory(id) {
    return this.httpClient.delete(this.config.serverUrl + 'subCategory/' + id);
  }

  getAllProductsByGroupName(groupName) {
    return this.httpClient.get(this.config.serverUrl + 'portfolio/group/' + groupName);
  }

  getProductGroupByGroupName(groupName) {
    return this.httpClient.get(this.config.serverUrl + "group/groupName/" + groupName);
  }

}

