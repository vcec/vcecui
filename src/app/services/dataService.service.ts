import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DataService {

  static backendUrl = 'http://10.120.88.222:3000/';

  constructor(private httpClient: HttpClient) {

  }

  /*

    // create category(solution)
    saveSolution(data) {
      return this.httpClient.post(DataService.backendUrl + 'saveSolution', data);
    }

    // create group
    saveGroup(data) {
      return this.httpClient.post(DataService.backendUrl + 'saveGroup', data);
    }

    // create portfolio
    savePortFolio(data) {
      return this.httpClient.post(DataService.backendUrl + 'savePortfolio', data);
    }

    // get portfolio by title
    getPortFolio(title) {
      return this.httpClient.get(DataService.backendUrl + 'getPortfolio', {params: new HttpParams().set('title', title)});
    }

    // UPDATE POSRTFOLIO
    updatePortFolio(data) {
      return this.httpClient.post(DataService.backendUrl + 'updatePortfolio', data);
    }

    // get all portfolios
    getAllPortFolios() {
      return this.httpClient.get(DataService.backendUrl + 'portfolio');
    }
  */

  // get all groups
  getAllGroups() {
    return this.httpClient.get(DataService.backendUrl + 'group');
  }

  // get all solutions/category
  getAllCategories() {
    return this.httpClient.get(DataService.backendUrl + 'category');
  }


  /*


    // update solution
    updateSolutions(data) {
      return this.httpClient.post(DataService.backendUrl + 'updateSolution', data);
    }

    // update group
    updateGroup(data) {
      return this.httpClient.post(DataService.backendUrl + 'updateGroup', data);
    }

    // delete portfolio
    deletePortfolio(data) {
      return this.httpClient.post(DataService.backendUrl + 'deletePortfolio', data);
    }

    // delete portfolio
    deleteGroup(data) {
      return this.httpClient.post(DataService.backendUrl + 'deleteGroup', data);
    }

    // delete portfolio
    deleteCategory(data) {
      return this.httpClient.post(DataService.backendUrl + 'deleteCategory', data);
    }
  */

}
